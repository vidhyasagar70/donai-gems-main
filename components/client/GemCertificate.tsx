"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { gemsApi } from "@/services/gems";
import { Gem } from "@/lib/validations/gems-Schema";
import { X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface GemCertificateProps {
    gem: Gem;
    index?: number;
    className?: string;
}

const GemCertificate = ({ gem, index = 0, className }: GemCertificateProps) => {
    const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchCertificateUrl = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await gemsApi.getFilesForGem(
                    "certificates",
                    gem._id
                );

                console.log(
                    "Certificate response for gem",
                    gem._id,
                    ":",
                    response
                );

                if (isMounted) {
                    if (
                        response?.data?.certificatesUrls &&
                        Array.isArray(response.data.certificatesUrls)
                    ) {
                        const urls = response.data.certificatesUrls;
                        console.log(
                            "Found",
                            urls.length,
                            "certificate URLs for gem",
                            gem._id
                        );

                        if (urls.length > index) {
                            const certUrl = urls[index];
                            console.log("Using certificate URL:", certUrl);
                            setCertificateUrl(certUrl);
                        } else {
                            console.log("No certificate found at index", index);
                            setCertificateUrl(null);
                        }
                    } else {
                        console.log("No certificates found");
                        setCertificateUrl(null);
                    }
                }
            } catch (error) {
                console.error(
                    "Failed to fetch certificate for",
                    gem._id,
                    ":",
                    error
                );
                setError(
                    error instanceof Error ? error.message : "Unknown error"
                );
                if (isMounted) {
                    setCertificateUrl(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchCertificateUrl();

        return () => {
            isMounted = false;
        };
    }, [gem._id, index]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
            </div>
        );
    }

    if (!certificateUrl || error) {
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                <FileText className="h-8 w-8 text-gray-400" />
            </div>
        );
    }

    return (
        <>
            {/* Certificate Thumbnail */}
            <div
                className={cn(
                    "w-full h-full cursor-pointer hover:scale-105 transition-all duration-500 border border-purple-200 rounded-lg overflow-hidden bg-white",
                    className
                )}
                onClick={openModal}
            >
                <Image
                    src={certificateUrl}
                    alt={`${gem.stoneType} Certificate ${index + 1}`}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                        console.error(
                            "Certificate image failed to load:",
                            certificateUrl,
                            "for gem:",
                            gem._id
                        );
                        setError("Failed to load certificate image");
                    }}
                />
                {/* Optional overlay with certificate label */}
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-[#00000082] flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-60"
                        aria-label="Close modal"
                    >
                        <X size={32} />
                    </button>

                    {/* Certificate Viewer */}
                    <div
                        className="relative max-w-4xl max-h-[90vh] w-auto h-auto flex items-center justify-center"
                        onClick={closeModal}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="w-full h-full"
                        >
                            <Image
                                alt={`${gem.stoneType} Certificate ${
                                    index + 1
                                }`}
                                src={certificateUrl}
                                className="w-full h-full border-0 bg-white"
                                style={{
                                    minWidth: "600px",
                                    minHeight: "800px",
                                }}
                                height={800}
                                width={600}
                                title="Certificate Preview"
                            />
                        </div>
                    </div>

                    {/* Certificate Info */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-lg font-medium">
                            {gem.stoneType} Certificate
                        </p>
                        <p className="text-sm text-gray-300">
                            {gem.certificate} • {gem.stockId}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default GemCertificate;
