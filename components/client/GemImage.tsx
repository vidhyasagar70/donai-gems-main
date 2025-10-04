"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { gemsApi } from "@/services/gems";
import { Gem } from "@/lib/validations/gems-Schema";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface GemImageProps {
    gem: Gem;
    index?: number;
    className?: string; // Optional className prop for styling
    disableModal?: boolean; // Add this prop to disable modal functionality
}
const fallbackUrl = "/semiPreciousFeature.jpg";
const GemImage = ({
    gem,
    index = 0,
    className,
    disableModal = false,
}: GemImageProps) => {
    const [imageUrl, setImageUrl] = useState<string>(fallbackUrl);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchImageUrl = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await gemsApi.getFilesForGem(
                    "images",
                    gem._id
                );

                console.log("Full response for gem", gem._id, ":", response);

                if (isMounted) {
                    // Check if response has the expected structure
                    if (
                        response?.data?.imagesUrls &&
                        Array.isArray(response.data.imagesUrls)
                    ) {
                        const urls = response.data.imagesUrls;
                        console.log(
                            "Found",
                            urls.length,
                            "URLs for gem",
                            gem._id
                        );

                        if (urls.length > 0) {
                            const firstUrl = urls[index];
                            console.log("Using URL:", firstUrl);
                            setImageUrl(firstUrl);
                        } else {
                            console.log("No URLs found, using fallback");
                            setImageUrl(fallbackUrl);
                        }
                    } else {
                        console.log("Unexpected response structure:", response);
                        setImageUrl(fallbackUrl);
                    }
                }
            } catch (error) {
                console.error(
                    "Failed to fetch gem image for",
                    gem._id,
                    ":",
                    error
                );
                setError(
                    error instanceof Error ? error.message : "Unknown error"
                );
                if (isMounted) {
                    setImageUrl(fallbackUrl);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchImageUrl();

        return () => {
            isMounted = false;
        };
    }, [gem._id]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    const openModal = () => {
        if (!disableModal) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <div className="w-full h-full bg-gray-200 animate-pulse" />;
    }

    if (error) {
        console.warn("Image error for gem", gem._id, ":", error);
    }

    return (
        <>
            {/* Main Image */}
            <Image
                src={imageUrl}
                alt={`${gem.stoneType} Gem`}
                priority
                quality={100}
                width={300}
                height={300}
                className={cn(
                    `object-contain w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                        !disableModal ? "cursor-pointer" : ""
                    }`,
                    className
                )}
                onClick={disableModal ? undefined : openModal}
                onError={(e) => {
                    // console.error(
                    //     "Image failed to load:",
                    //     imageUrl,
                    //     "for gem:",
                    //     gem._id
                    // );
                    setImageUrl(fallbackUrl);
                }}
                onLoad={() => {
                    console.log(
                        "Image loaded successfully:",
                        imageUrl,
                        "for gem:",
                        gem._id
                    );
                }}
            />

            {/* Modal Overlay - only render if modal is enabled */}
            {!disableModal && isModalOpen && (
                <div
                    className="fixed inset-0 bg-[#00000082]  flex items-center justify-center z-50 p-4"
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

                    {/* Enlarged Image */}
                    <div
                        className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={closeModal}
                    >
                        <span onClick={(e) => e.stopPropagation()}>
                            <Image
                                src={imageUrl}
                                alt={`${gem.stoneType} Gem - Enlarged`}
                                width={800}
                                height={800}
                                className="object-contain w-full h-full max-w-full max-h-full"
                                onError={(e) => {
                                    // console.error(
                                    //     "Modal image failed to load:",
                                    //     imageUrl,
                                    //     "for gem:",
                                    //     gem._id
                                    // );
                                    setImageUrl("/semiPreciousFeature.jpg");
                                }}
                            />
                        </span>
                    </div>

                    {/* Image Info */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-lg font-medium">{gem.stoneType}</p>
                        <p className="text-sm text-gray-300">
                            {gem.carat} carat • {gem.color} • {gem.shape}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default GemImage;
