"use client";

import React from "react";
import { Gem } from "@/lib/validations/gems-Schema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/FileUploader";

interface UploadFilesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    gem: Gem;
}

export function UploadFilesModal({
    isOpen,
    onClose,
    onSuccess,
    gem,
}: UploadFilesModalProps) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Upload Files for {gem.stockId}</DialogTitle>
                    <DialogDescription>
                        Upload images, videos, and certificates for this gem.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <FileUploader
                        fileType="images"
                        stockId={gem._id}
                        onUploadSuccess={() => {
                            alert("Images uploaded successfully");
                        }}
                    />
                    <FileUploader
                        fileType="videos"
                        stockId={gem._id}
                        onUploadSuccess={() => {
                            alert("Images uploaded successfully");
                        }}
                    />
                    <FileUploader
                        fileType="certificates"
                        stockId={gem._id}
                        onUploadSuccess={() => {
                            alert("Images uploaded successfully");
                        }}
                    />
                </div>
                <DialogFooter>
                    <Button type="button" variant="default" onClick={onClose}>
                        Finish
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
