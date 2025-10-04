"use client";

import { useParams, useSearchParams } from "next/navigation";
import { GemsFilter } from "@/components/client/GemsFilter";
import { ClientGemsTable } from "@/components/client/ClientGemsTable";
import { useClientGems } from "@/hooks/useClientGems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GemstoneShapePage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const gemstone = params.gemstone as string;
    console.log("Gemstone:", gemstone);

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

    // Available gemstones for dropdown
    const availableGemstones = [
        { value: "emerald", label: "Emerald" },
        { value: "sapphire", label: "Sapphire" },
        { value: "ruby", label: "Ruby" },
        { value: "semiprecious", label: "Semi-precious" },
    ];

    // Initialize filters based on URL params - only gemstone type, no shape filter
    useEffect(() => {
        // Map gemstone names to API stone types
        const getStoneType = (gemstone: string): string => {
            switch (gemstone.toLowerCase()) {
                case "emerald":
                    return "nat emerald";
                case "sapphire":
                    return "nat sapphire";
                case "ruby":
                    return "nat ruby";
                default:
                    return gemstone;
            }
        };

        const urlFilters = {
            type: [getStoneType(gemstone)],
            shape: [], // Remove shape filtering - fetch all shapes
            color: [],
            carat: [0, 10] as [number, number],
            origin: [],
        };

        console.log("Initializing filters:", urlFilters);
        initializeFromParams(urlFilters);
    }, [gemstone, initializeFromParams]);

    const getPageTitle = () => {
        const gemstoneTitle =
            gemstone.charAt(0).toUpperCase() + gemstone.slice(1);
        return `${gemstoneTitle} Collection`;
    };

    const getInitialFiltersForSidebar = () => {
        // Map gemstone to stone type
        const getStoneType = (gemstone: string): string => {
            switch (gemstone.toLowerCase()) {
                case "emerald":
                    return "nat emerald";
                case "sapphire":
                    return "nat sapphire";
                case "ruby":
                    return "nat ruby";
                default:
                    return gemstone;
            }
        };

        return {
            shape: [], // Allow all shapes in the filter sidebar
            color: [],
            carat: [0, 10] as [number, number],
            type: [getStoneType(gemstone)],
            origin: [],
        };
    };

    const handleGemstoneChange = (newGemstone: string) => {
        router.push(`/gemstones/${newGemstone}`);
    };

    return (
        <div className="min-h-screen">
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
                                <BreadcrumbLink href="/gemstones">
                                    Gemstones
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground">
                                        {gemstone.charAt(0).toUpperCase() +
                                            gemstone.slice(1)}
                                        <ChevronDown className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {availableGemstones.map((gem) => (
                                            <DropdownMenuItem
                                                key={gem.value}
                                                onClick={() =>
                                                    handleGemstoneChange(
                                                        gem.value
                                                    )
                                                }
                                                className={
                                                    gem.value === gemstone
                                                        ? "bg-accent"
                                                        : ""
                                                }
                                            >
                                                {gem.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {getPageTitle()}
                        </h1>
                        <p className="text-gray-600">
                            Discover our complete collection of {gemstone}{" "}
                            gemstones in all shapes and sizes
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>
                                Error loading gems: {error}
                                <Button
                                    onClick={refetch}
                                    variant="outline"
                                    size="sm"
                                    className="ml-4"
                                >
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
