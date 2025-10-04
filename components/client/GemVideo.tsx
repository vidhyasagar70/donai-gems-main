"use client";

import React, { useState, useEffect } from "react";
import { gemsApi } from "@/services/gems";
import { Gem } from "@/lib/validations/gems-Schema";
import { X, Play, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface GemVideoProps {
    gem: Gem;
    index?: number;
    className?: string;
}

const GemVideo = ({ gem, index = 0, className }: GemVideoProps) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchVideoUrl = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await gemsApi.getFilesForGem(
                    "videos",
                    gem._id
                );

                console.log("Video response for gem", gem._id, ":", response);

                if (isMounted) {
                    if (
                        response?.data?.videoUrls &&
                        Array.isArray(response.data.videoUrls)
                    ) {
                        const urls = response.data.videoUrls;
                        console.log(
                            "Found",
                            urls.length,
                            "video URLs for gem",
                            gem._id
                        );

                        if (urls.length > index) {
                            const vidUrl = urls[index];
                            console.log("Using video URL:", vidUrl);
                            setVideoUrl(vidUrl);
                        } else {
                            console.log("No video found at index", index);
                            setVideoUrl(null);
                        }
                    } else {
                        console.log("No videos found");
                        setVideoUrl(null);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch video for", gem._id, ":", error);
                setError(
                    error instanceof Error ? error.message : "Unknown error"
                );
                if (isMounted) {
                    setVideoUrl(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchVideoUrl();

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
                <Video className="h-8 w-8 text-gray-400" />
            </div>
        );
    }

    if (!videoUrl || error) {
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                <Video className="h-8 w-8 text-gray-400" />
            </div>
        );
    }

    return (
        <>
            {/* Video Thumbnail */}
            <div
                className={cn(
                    "w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500 border border-green-200 relative group",
                    className
                )}
                onClick={openModal}
            >
                <Video className="h-6 w-6 text-green-600 mb-1" />
                <Play className="h-4 w-4 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs text-green-600 font-medium text-center px-1">
                    Video {index + 1}
                </span>
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

                    {/* Video Player */}
                    <div
                        className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={closeModal}
                    >
                        <div onClick={(e) => e.stopPropagation()}>
                            <video
                                src={videoUrl}
                                controls
                                autoPlay
                                className="max-w-full max-h-full"
                                style={{
                                    maxWidth: "800px",
                                    maxHeight: "600px",
                                }}
                            />
                        </div>
                    </div>

                    {/* Video Info */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-lg font-medium">
                            {gem.stoneType} Video
                        </p>
                        <p className="text-sm text-gray-300">
                            {gem.carat} carat • {gem.color} • {gem.shape}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default GemVideo;
