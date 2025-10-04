"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { GemsFilter } from "@/components/client/GemsFilter";
import { ClientGemsTable } from "@/components/client/ClientGemsTable";
import { useClientGems } from "@/hooks/useClientGems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { InventoryGuard } from "@/components/guards/InventoryGuard";
import Container from "@/components/ui/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function InventoryPageContent() {
    const params = useParams();
    const productType = params.productype as string;

    const {
        gems,
        loading,
        error,
        totalCount,
        pageCount,
        currentPage,
        refetch,
        updateFilters,
        updateSearch,
        updateSort,
        updatePage,
        updatePageSize,
        paginationMeta,
        initializeFromParams,
    } = useClientGems();

    // Initialize filters based on product type
    useEffect(() => {
        const getProductTypeFilters = (productType: string) => {
            const normalizedType = productType.toLowerCase();

            if (
                normalizedType === "gemstone" ||
                normalizedType === "gemstones"
            ) {
                return ["GEM"]; // Filter for gemstone products
            } else if (
                normalizedType === "jewellery" ||
                normalizedType === "jewelery"
            ) {
                return ["Jewelry"]; // Filter for jewelry products
            }

            return []; // No filter if unknown type
        };

        const productTypeFilters = getProductTypeFilters(productType);

        if (productTypeFilters.length > 0) {
            const urlFilters = {
                shape: [],
                color: [],
                carat: [0, 10] as [number, number],
                type: [], // This is for stone type, not product type
                origin: [],
                productType: productTypeFilters, // Add product type filter
            };

            console.log(
                "Initializing filters for product type:",
                productType,
                urlFilters
            );
            initializeFromParams(urlFilters);
        }
    }, [productType, initializeFromParams]);

    const getPageTitle = () => {
        const normalizedType = productType.toLowerCase();

        if (normalizedType === "gemstone" || normalizedType === "gemstones") {
            return "Gemstones Collection";
        } else if (
            normalizedType === "jewellery" ||
            normalizedType === "jewelery"
        ) {
            return "Jewelry Collection";
        }

        return "Products Collection";
    };

    const getPageDescription = () => {
        const normalizedType = productType.toLowerCase();
        console.log("Normalized product type:", normalizedType);

        if (normalizedType === "gemstone" || normalizedType === "gemstones") {
            return "Explore our exquisite collection of natural gemstones";
        } else if (
            normalizedType === "jewellery" ||
            normalizedType === "jewelery"
        ) {
            return "Discover our stunning collection of fine jewelry pieces";
        }

        return "Browse our complete products collection";
    };

    const getBreadcrumbLabel = () => {
        const normalizedType = productType.toLowerCase();

        if (normalizedType === "gemstone" || normalizedType === "gemstones") {
            return "Gemstones";
        } else if (
            normalizedType === "jewellery" ||
            normalizedType === "jewelry"
        ) {
            return "Jewelry";
        }

        return productType.charAt(0).toUpperCase() + productType.slice(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Container>
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {getBreadcrumbLabel()}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {getPageTitle()}
                        </h1>
                        <p className="text-gray-600">{getPageDescription()}</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>
                                Error loading {productType.toLowerCase()}:{" "}
                                {error}
                                <Button
                                    onClick={refetch}
                                    variant="outline"
                                    size="sm"
                                    className="ml-4"
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Retry
                                </Button>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Main Content */}
                    <div className="flex flex-col gap-8">
                        {/* Gems Table */}
                        <div className="lg:col-span-3">
                            <ClientGemsTable
                                gems={gems}
                                loading={loading}
                                currentPage={
                                    paginationMeta?.currentPage || currentPage
                                }
                                totalPages={
                                    paginationMeta?.totalPages || pageCount
                                }
                                totalRecords={
                                    paginationMeta?.totalRecords || totalCount
                                }
                                recordsPerPage={
                                    paginationMeta?.recordsPerPage || 6
                                }
                                hasNextPage={
                                    paginationMeta?.hasNextPage || false
                                }
                                hasPrevPage={
                                    paginationMeta?.hasPrevPage || false
                                }
                                onPageChange={updatePage}
                                onPageSizeChange={updatePageSize}
                                onSearchChange={updateSearch}
                                onSortChange={updateSort}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default function InventoryPage() {
    return (
        <InventoryGuard>
            <InventoryPageContent />
        </InventoryGuard>
    );
}
