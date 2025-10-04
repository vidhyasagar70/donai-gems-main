"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, File, X } from "lucide-react";
import { toast } from "sonner";
import { gemsApi, fileUploadRequestBody } from "@/services/gems";

interface FileUploaderProps {
    fileType: "images" | "videos" | "certificates";
    stockId: string; // The API uses the gem's _id as the stockId for uploads
    onUploadSuccess?: () => void;
}

export const FileUploader = ({
    fileType,
    stockId,
    onUploadSuccess,
}: FileUploaderProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        if (files.length + selectedFiles.length > 5) {
            toast("You can upload a maximum of 5 files at a time.");
            return;
        }

        const validFiles = selectedFiles.filter((file) => {
            if (file.size > 2 * 1024 * 1024) {
                // 2MB limit
                toast(`${file.name} is too large. Maximum size is 2MB.`);
                return false;
            }
            return true;
        });

        setFiles((prev) => [...prev, ...validFiles]);
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            toast("Please select files to upload.");
            return;
        }
        setIsUploading(true);
        try {
            const fileDetailsPromises = files.map(
                async (file): Promise<fileUploadRequestBody> => {
                    const base64 = await convertFileToBase64(file);
                    return {
                        base64,
                        size: file.size,
                        fileName: file.name,
                        fileType: file.type,
                    };
                }
            );

            const fileDetails = await Promise.all(fileDetailsPromises);
            await gemsApi.uploadFilesForGem(fileType, stockId, fileDetails);

            toast(
                `${
                    fileType.charAt(0).toUpperCase() + fileType.slice(1)
                } uploaded successfully!`
            );
            setFiles([]);
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            console.error(`Error uploading ${fileType}:`, error);
            toast(`Failed to upload ${fileType}.`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium capitalize">{fileType}</h3>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                            Max 5 files, 2MB each
                        </p>
                    </div>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileSelect}
                        accept={
                            fileType === "images"
                                ? "image/*"
                                : fileType === "videos"
                                ? "video/*"
                                : ".pdf"
                        }
                    />
                </label>
            </div>
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-2 text-sm bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center gap-2 truncate">
                                <File className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{file.name}</span>
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => removeFile(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
            <Button
                onClick={handleSubmit}
                disabled={isUploading || files.length === 0}
                className="w-full"
            >
                {isUploading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUploading
                    ? `Uploading ${fileType}...`
                    : `Submit ${fileType}`}
            </Button>
        </div>
    );
};
