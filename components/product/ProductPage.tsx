"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RequestQuoteModal } from "@/components/modals/RequestQuoteModal";
import {
    Heart,
    Share2,
    Star,
    FileCheck2,
    Gem,
    Trash2,
    Eye,
    Video,
    FileText,
    Shield,
    Award,
    MapPin,
} from "lucide-react";
import { Gem as GemType } from "@/lib/validations/gems-Schema";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import GemImage from "../client/GemImage";
import GemCertificate from "../client/GemCertificate";
import GemVideo from "../client/GemVideo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
export interface ProductPageProps {
    productId: string;
}

interface FileUrls {
    images: string[];
    videos: string[];
    certificates: string[];
}

export function ProductPage({ productId }: ProductPageProps) {
    const [product, setProduct] = useState<GemType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [fileUrls, setFileUrls] = useState<FileUrls>({
        images: [],
        videos: [],
        certificates: [],
    });
    const [fileLoading, setFileLoading] = useState<Record<string, boolean>>({});
    const [previewFile, setPreviewFile] = useState<{
        url: string;
        type: string;
    } | null>(null);

    const { isAdmin } = useAuth();

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    useEffect(() => {
        if (product && isAdmin) {
            fetchAllFiles();
        }
    }, [product, isAdmin]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);

            // Using search endpoint with stockId filter
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gems/search?stockId=${productId}&limit=1`
            );

            if (response.data.success && response.data.data.length > 0) {
                setProduct(response.data.data[0]);
            } else {
                setError("Product not found");
            }
        } catch (err) {
            console.error("Error fetching product:", err);
            setError("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    const fetchAllFiles = async () => {
        if (!product?._id) return;

        const fileTypes = ["images", "videos", "certificates"] as const;

        for (const fileType of fileTypes) {
            try {
                setFileLoading((prev) => ({ ...prev, [fileType]: true }));

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gems/S3Bucket/${fileType}/${product._id}`
                );

                if (response.data.status === 200) {
                    const urls = response.data.data[`${fileType}Urls`] || [];
                    setFileUrls((prev) => ({
                        ...prev,
                        [fileType]: urls,
                    }));
                }
            } catch (error) {
                console.error(`Error fetching ${fileType}:`, error);
                // Don't show error toast for file fetching as it's expected that some gems might not have files
            } finally {
                setFileLoading((prev) => ({ ...prev, [fileType]: false }));
            }
        }
    };

    const deleteFile = async (fileType: string, fileUrl: string) => {
        if (!product?._id) return;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gems/S3Bucket/delete/${fileType}/${product._id}`,
                {
                    urls: [fileUrl],
                }
            );

            if (response.data.status === 200) {
                // Remove the deleted file from the state
                setFileUrls((prev) => ({
                    ...prev,
                    [fileType]: prev[fileType as keyof FileUrls].filter(
                        (url) => url !== fileUrl
                    ),
                }));
                toast.success(`${fileType.slice(0, -1)} deleted successfully`);
            } else {
                throw new Error(`Failed to delete ${fileType.slice(0, -1)}`);
            }
        } catch (error) {
            console.error(`Error deleting ${fileType}:`, error);
            toast.error(`Failed to delete ${fileType.slice(0, -1)}`);
        }
    };

    const openPreview = (url: string, type: string) => {
        setPreviewFile({ url, type });
    };

    const closePreview = () => {
        setPreviewFile(null);
    };

    const getProductDescription = (product: GemType) => {
        if (product.productType.toLowerCase().includes("gem")) {
            return `A timeless symbol of love and passion, this elegant ${product.stoneType.toLowerCase()} features a vivid ${product.shape.toLowerCase()}-cut natural ${product.stoneType.toLowerCase()} flanked by brilliant details. Set with striking contrast, and mounted with a high-polish finish. Perfect for engagements, anniversaries, or meaningful milestones — classic, romantic, and unforgettable.`;
        } else {
            return `An exquisite piece of fine jewelry featuring premium ${product.stoneType.toLowerCase()} craftsmanship. This stunning ${product.category.toLowerCase()} showcases exceptional artistry with its ${product.shape.toLowerCase()} design and ${product.color.toLowerCase()} finish. Crafted with attention to detail and quality, making it perfect for special occasions or as a treasured addition to any jewelry collection.`;
        }
    };

    const handleFavoriteToggle = () => {
        // TODO: Implement favorite functionality with backend
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${product?.stoneType} - ${product?.stockId}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const renderFileList = (
        files: string[],
        fileType: string,
        icon: React.ReactNode
    ) => {
        return (
            <Card className="mt-4">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        {icon}
                        {fileType.charAt(0).toUpperCase() + fileType.slice(1)} (
                        {files.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {fileLoading[fileType] ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : files.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                            No {fileType} available
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {files.map((url, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        {icon}
                                        <span className="text-sm font-bold truncate max-w-[200px]">
                                            {fileType.slice(0, -1)} {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                openPreview(url, fileType)
                                            }
                                            className="h-8 w-8 p-0"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                deleteFile(fileType, url)
                                            }
                                            className="h-8 w-8 p-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="aspect-square rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-12 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                        <div className="space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-6 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Alert variant="destructive">
                    <AlertDescription>
                        {error || "Product not found"}
                        <Button
                            onClick={fetchProduct}
                            variant="outline"
                            size="sm"
                            className="ml-4"
                        >
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="relative">
                    <div className="space-y-4 sticky top-30">
                        <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                            {/* Main product image placeholder */}
                            <Carousel className="w-full h-full">
                                <CarouselContent>
                                    {/* Default GemImage if no uploaded images */}
                                    {fileUrls.images.length === 0 && (
                                        <CarouselItem>
                                            <div className="w-full h-full flex items-center justify-center">
                                                <GemImage
                                                    gem={product}
                                                    className="hover:scale-105 transition-all duration-500"
                                                    disableModal={true}
                                                />
                                            </div>
                                        </CarouselItem>
                                    )}

                                    {/* Uploaded images from S3 */}
                                    {fileUrls.images.map((imageUrl, index) => (
                                        <CarouselItem
                                            key={index}
                                            onClick={() =>
                                                openPreview(imageUrl, "images")
                                            }
                                            className="cursor-pointer"
                                        >
                                            <div className="w-full h-full flex items-center justify-center">
                                                <GemImage
                                                    gem={product}
                                                    index={index}
                                                    className="hover:scale-105 transition-all duration-500 object-center"
                                                    disableModal={true}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                {/* Show navigation only if there are multiple images */}
                                {(fileUrls.images.length > 1 ||
                                    (fileUrls.images.length === 0 &&
                                        1 > 1)) && (
                                    <>
                                        <CarouselPrevious className="left-4" />
                                        <CarouselNext className="right-4" />
                                    </>
                                )}
                            </Carousel>

                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={handleShare}
                                    className="bg-white/80 hover:bg-white"
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Thumbnail images - Now includes images, videos, and certificates */}
                        <div className="grid grid-cols-4 gap-2">
                            {/* First thumbnail - additional gem image */}
                            <div className="aspect-square bg-transparent rounded-lg cursor-pointer">
                                {/* <GemImage
                                    gem={product}
                                    index={1}
                                    className="hover:scale-105 transition-all duration-500"
                                /> */}
                            </div>

                            {/* Second thumbnail - gem video */}
                            <div className="aspect-square rounded-lg cursor-pointer">
                                <GemVideo
                                    gem={product}
                                    index={0}
                                    className="hover:scale-105 transition-all duration-500"
                                />
                            </div>

                            {/* Third thumbnail - gem certificate */}
                            <div className="aspect-square rounded-lg cursor-pointer">
                                <GemCertificate
                                    gem={product}
                                    index={0}
                                    className="hover:scale-105 transition-all duration-500"
                                />
                            </div>

                            {/* Fourth thumbnail - another gem image */}
                            <div className="aspect-square bg-transparent rounded-lg cursor-pointer">
                                {/* <GemImage
                                    gem={product}
                                    index={2}
                                    className="hover:scale-105 transition-all duration-500"
                                /> */}
                            </div>
                        </div>
                        {/* {product.availability && (
                            <div className="flex w-full border-gray-300 border-1 rounded-md p-5 items-center justify-between">
                                <Badge
                                    variant={
                                        product.availability
                                            ? "default"
                                            : "secondary"
                                    }
                                    className={`${
                                        product.availability
                                            ? "text-gray-800 bg-transparent "
                                            : "bg-red-100 text-red-800 hover:bg-red-200"
                                    }`}
                                >
                                    {product.availability
                                        ? "In Stock"
                                        : "Sold Out"}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="border-none text-gray-400"
                                >
                                    {" "}
                                    Ships within 24h
                                </Badge>
                            </div>
                        )} */}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge
                                variant="outline"
                                className="text-[#C49A6C] border-[#C49A6C]"
                            >
                                {product.productType}
                            </Badge>
                            <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {product.description}
                        </h1>
                        {/* <h2 className="text-xl font-semibold text-primary mb-4">
                            Natural {product.stoneType}
                        </h2> */}

                        {/* Stock ID */}
                        <p className="text-sm text-gray-600">
                            Stock ID:{" "}
                            <span className="font-bold">{product.stockId}</span>
                        </p>
                    </div>

                    {/* Description */}
                    <div className="border-primary border rounded-lg p-6 ">
                        <p className="text-gray-600 leading-relaxed">
                            {product.details}
                        </p>
                    </div>

                    {/* Specifications */}
                    <h1 className="text-lg font-semibold pl-1">
                        Specifications
                    </h1>
                    <Card className="py-3 px-0">
                        <CardContent className=" py-0 px-0 ">
                            <div className="flex flex-col  text-base">
                                <div className="flex justify-between px-5 items-center py-4 border-b border-gray-100">
                                    <span className="text-gray-600 font-bold">
                                        Cut:
                                    </span>
                                    <span className="font-normal  text-gray-400">
                                        {product.shape}
                                    </span>
                                </div>
                                <div className="flex bg-primary/10 justify-between items-center px-5 py-4 border-b border-gray-100">
                                    <span className="text-gray-600 font-bold">
                                        Color:
                                    </span>
                                    <span className="font-semibold text-[#A65940]">
                                        {product.color}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                    <span className="text-gray-600 font-bold">
                                        Carat:
                                    </span>
                                    <span className="font-normal  text-gray-400">
                                        {product.carat} ct
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                    <span className="text-gray-600 font-bold">
                                        Origin:
                                    </span>
                                    <span className="font-normal  text-gray-400">
                                        {product.origin}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                    <span className="text-gray-600 font-bold">
                                        Treatment:
                                    </span>
                                    <span className="ffont-normal  text-gray-400">
                                        {product.treatment}
                                    </span>
                                </div>
                                <div className="flex justify-between bg-primary/10 items-center px-5 py-4 border-b border-gray-100">
                                    <span className="text-gray-600 font-bold">
                                        Certificate:
                                    </span>
                                    <span className="font-semibold text-[#A65940]">
                                        {product.certificate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 col-span-2">
                                    <span className="text-gray-600 font-bold">
                                        Measurement:
                                    </span>
                                    <span className="font-normal  text-gray-400">
                                        {product.measurement}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Certifications & Quality */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                Certifications & Quality
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                                {/* GRS Certified */}
                                <div className="flex items-center text-center space-x-4 space-y-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                        <Shield className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-left text-gray-800 mb-1">
                                            {product.certificate} Certified
                                        </h4>
                                        <p className="text-sm text-left text-gray-600">
                                            Genuine authenticity
                                        </p>
                                    </div>
                                </div>

                                {/* Premium Quality */}
                                <div className="flex items-center text-center space-x-4 space-y-3">
                                    <div className="w-12 h-12  rounded-full flex items-center justify-center">
                                        <Award className="h-6 w-6 text-yellow-500" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-gray-800 mb-1">
                                            Premium Quality
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Exceptional craftsmanship
                                        </p>
                                    </div>
                                </div>

                                {/* Origin */}
                                <div className="flex  items-center  text-center space-x-4 space-y-3">
                                    <div className="w-12 h-12  rounded-full flex items-center justify-center">
                                        <MapPin className="h-6 w-6 text-green-500" />
                                    </div>
                                    <div className="text-left -translate-y-1">
                                        <h4 className="font-semibold text-gray-800 mb-1">
                                            {product.origin} Origin
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Ethically sourced
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Button
                                className="flex-1 bg-[#C49A6C] hover:bg-[#B8956A] text-white"
                                size="lg"
                                onClick={() => setIsQuoteModalOpen(true)}
                            >
                                Request Quote
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-[#C49A6C] text-[#C49A6C] hover:bg-[#C49A6C] hover:text-white"
                                size="lg"
                            >
                                Contact Us
                            </Button>
                        </div>

                        {/* Additional Information */}
                        {/* <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="font-normal text-gray-400">
                                    Free shipping worldwide
                                </h4>
                                <Badge className="bg-[#E9E3D6] text-black">
                                    Premium Service
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="font-normal text-gray-400">
                                    30-day return policy
                                </h4>
                                <Badge
                                    variant={"outline"}
                                    className=" text-black"
                                >
                                    Guaranteed
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="font-normal text-gray-400">
                                    Lifetime authentication
                                </h4>
                                <Badge className="bg-[#A65940] text-white">
                                    Included
                                </Badge>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Admin File Management Panel */}
            {isAdmin && (
                <div className="mt-12">
                    <Separator className="mb-8" />
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="destructive"
                                className="bg-red-100 text-red-800"
                            >
                                ADMIN PANEL
                            </Badge>
                            <h3 className="text-2xl font-bold text-gray-900">
                                File Management
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                {renderFileList(
                                    fileUrls.images,
                                    "images",
                                    <Gem className="h-5 w-5 text-blue-500" />
                                )}
                            </div>
                            <div>
                                {renderFileList(
                                    fileUrls.videos,
                                    "videos",
                                    <Video className="h-5 w-5 text-green-500" />
                                )}
                            </div>
                            <div>
                                {renderFileList(
                                    fileUrls.certificates,
                                    "certificates",
                                    <FileText className="h-5 w-5 text-purple-500" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* File Preview Modal */}
            {previewFile && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={closePreview}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <button
                            onClick={closePreview}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-60"
                            aria-label="Close preview"
                        >
                            <span className="text-2xl">✕</span>
                        </button>

                        <div onClick={(e) => e.stopPropagation()}>
                            {previewFile.type === "images" && (
                                <Image
                                    src={previewFile.url}
                                    alt="Preview"
                                    width={800}
                                    height={800}
                                    className="object-contain w-full h-full max-w-full max-h-full"
                                />
                            )}
                            {previewFile.type === "videos" && (
                                <video
                                    src={previewFile.url}
                                    controls
                                    className="max-w-full max-h-full"
                                    style={{
                                        maxWidth: "800px",
                                        maxHeight: "600px",
                                    }}
                                />
                            )}
                            {previewFile.type === "certificates" && (
                                <iframe
                                    src={previewFile.url}
                                    className="w-full h-full border-0"
                                    style={{
                                        minWidth: "600px",
                                        minHeight: "800px",
                                    }}
                                    title="Certificate Preview"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            <RequestQuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                productId={productId}
            />
        </div>
    );
}
