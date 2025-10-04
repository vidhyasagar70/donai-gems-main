"use client";

import { useParams, useSearchParams } from "next/navigation";
import { GemsFilter } from "@/components/client/GemsFilter";
import { ClientGemsTable } from "@/components/client/ClientGemsTable";
import { useClientGems } from "@/hooks/useClientGems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
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
    const shape = params.shape as string;
    console.log("Gemstone:", gemstone, "Shape:", shape);

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
        { value: "semi-precious", label: "Semi-precious" },
    ];

    // Available shapes for dropdown
    const availableShapes = [
        {
            value: `all-${gemstone}`,
            label: `All ${
                gemstone.charAt(0).toUpperCase() + gemstone.slice(1)
            }`,
        },
        { value: "cushion", label: "Cushion" },
        { value: "oval", label: "Oval" },
        { value: "round", label: "Round" },
        { value: "rectangle", label: "Rectangle" },
        { value: "pear", label: "Pear" },
        { value: "heart", label: "Heart" },
        { value: "antique-cushion", label: "Antique Cushion" },
        { value: "octagonal", label: "Octagonal" },
    ];

    // Initialize filters based on URL params
    useEffect(() => {
        // Map gemstone names to API stone types
        const getStoneType = (gemstone: string): string => {
            switch (gemstone.toLowerCase()) {
                case "emerald":
                    return "emerald";
                case "sapphire":
                    return "sapphire";
                case "ruby":
                    return "ruby";
                default:
                    return gemstone;
            }
        };

        // Map shape names to API shape values
        const getShapeValue = (shape: string, gemstone: string): string[] => {
            // Handle "all" shapes
            if (shape === `all-${gemstone}`) {
                return [];
            }

            // Map common shape variations to API values
            const shapeMapping: { [key: string]: string } = {
                cushion: "cushion",
                round: "Oval", // API might use Oval for round
                oval: "Oval",
                rectangle: "rectangular",
                rectangular: "rectangular",
                pear: "pear shape",
                heart: "heart shape",
                "antique-cushion": "antique cushion",
                octagonal: "octagonal",
            };

            const normalizedShape = shape.toLowerCase().replace(/-/g, "-");
            const apiShape = shapeMapping[normalizedShape] || shape;

            return [apiShape];
        };

        const urlFilters = {
            type: [getStoneType(gemstone)],
            shape: getShapeValue(shape, gemstone),
            color: [],
            carat: [0, 10] as [number, number],
            origin: [],
        };

        console.log("Initializing filters:", urlFilters);
        initializeFromParams(urlFilters);
    }, [gemstone, shape, initializeFromParams]);

    const getPageTitle = () => {
        const gemstoneTitle =
            gemstone.charAt(0).toUpperCase() + gemstone.slice(1);
        const shapeTitle =
            shape === `all-${gemstone}`
                ? "All Shapes"
                : shape.charAt(0).toUpperCase() +
                  shape.slice(1).replace(/-/g, " ");
        return `${gemstoneTitle} - ${shapeTitle}`;
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

        // Get shape value
        const getShapeValue = (shape: string, gemstone: string): string[] => {
            if (shape === `all-${gemstone}`) {
                return [];
            }

            const shapeMapping: { [key: string]: string } = {
                cushion: "cushion",
                round: "Oval",
                oval: "Oval",
                rectangle: "rectangular",
                rectangular: "rectangular",
                pear: "pear shape",
                heart: "heart shape",
                "antique-cushion": "antique cushion",
                octagonal: "octagonal",
            };

            const normalizedShape = shape.toLowerCase().replace(/-/g, "-");
            const apiShape = shapeMapping[normalizedShape] || shape;

            return [apiShape];
        };

        return {
            shape: getShapeValue(shape, gemstone),
            color: [],
            carat: [0, 10] as [number, number],
            type: [getStoneType(gemstone)],
            origin: [],
        };
    };

    const handleGemstoneChange = (newGemstone: string) => {
        router.push(`/gemstones/${newGemstone}/${shape}`);
    };

    const handleShapeChange = (newShape: string) => {
        router.push(`/gemstones/${gemstone}/${newShape}`);
    };

    const formatShapeLabel = (shape: string) => {
        if (shape === `all-${gemstone}`) {
            return `All ${
                gemstone.charAt(0).toUpperCase() + gemstone.slice(1)
            }`;
        }
        return (
            shape.charAt(0).toUpperCase() + shape.slice(1).replace(/-/g, " ")
        );
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
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground">
                                        {formatShapeLabel(shape)}
                                        <ChevronDown className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {availableShapes.map((shapeOption) => (
                                            <DropdownMenuItem
                                                key={shapeOption.value}
                                                onClick={() =>
                                                    handleShapeChange(
                                                        shapeOption.value
                                                    )
                                                }
                                                className={
                                                    shapeOption.value === shape
                                                        ? "bg-accent"
                                                        : ""
                                                }
                                            >
                                                {shapeOption.label}
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
                            Discover our collection of {gemstone} gemstones
                            {shape !== `all-${gemstone}` &&
                                ` in ${shape.replace(/-/g, " ")} shape`}
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
