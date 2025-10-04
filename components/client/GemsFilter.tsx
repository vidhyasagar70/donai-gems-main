"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// You should replace these with your actual shape icon SVGs or PNGs
import roundImg from "@/public/roundImg.svg";
import princessImg from "@/public/princessImg.svg";
import cushionImg from "@/public/cushionImg.svg";
import emeraldImg from "@/public/emeraldImg.svg";
import ovalImg from "@/public/ovalImg.svg";
import radiantImg from "@/public/radiantImg.svg";
import asscherImg from "@/public/asscherImg.svg";
import marquiseImg from "@/public/marquiseImg.svg";
import heartImg from "@/public/heartImg.svg";
import pearImg from "@/public/pearImg.svg";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface FilterState {
    shape: string[];
    color: string[];
    carat: [number, number];
    type: string[];
    origin: string[];
    productType?: string[]; // Add this
}

interface GemsFilterProps {
    filters?: FilterState; // Make filters prop optional and accept initial filters
    onFiltersChange: (filters: FilterState) => void;
    loading?: boolean;
}

const shapeOptions = [
    { value: "Round", label: "Round", image: roundImg },
    { value: "Princess", label: "Princess", image: princessImg },
    { value: "Cushion", label: "Cushion", image: cushionImg },
    { value: "Emerald", label: "Emerald", image: emeraldImg },
    { value: "Oval", label: "Oval", image: ovalImg },
    { value: "Radiant", label: "Radiant", image: radiantImg },
    { value: "Asscher", label: "Asscher", image: asscherImg },
    { value: "Marquise", label: "Marquise", image: marquiseImg },
    { value: "Heart", label: "Heart", image: heartImg },
    { value: "Pear", label: "Pear", image: pearImg },
];

const colorGrades = ["D", "E", "F", "G", "H", "I", "J", "K"];

const typeOptions = [
    { value: "Natural", label: "Natural" },
    { value: "Lab-Grown", label: "Lab-Grown" },
    { value: "Treated", label: "Treated" },
];

const originOptions = [
    { value: "Myanmar", label: "Myanmar" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Thailand", label: "Thailand" },
    { value: "Brazil", label: "Brazil" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "India", label: "India" },
];

export function GemsFilter({
    filters: initialFilters,
    onFiltersChange,
    loading = false,
}: GemsFilterProps) {
    const [filters, setFilters] = useState<FilterState>({
        shape: initialFilters?.shape || [],
        color: initialFilters?.color || [],
        carat: initialFilters?.carat || [0.5, 7.5],
        type: initialFilters?.type || [],
        origin: initialFilters?.origin || [],
        productType: initialFilters?.productType || [],
    });

    // Update filters when initialFilters change
    useEffect(() => {
        if (initialFilters) {
            setFilters({
                shape: initialFilters.shape || [],
                color: initialFilters.color || [],
                carat: initialFilters.carat || [0.5, 7.5],
                type: initialFilters.type || [],
                origin: initialFilters.origin || [],
                productType: initialFilters.productType || [],
            });
        }
    }, [initialFilters]);

    const handleMultiSelectChange = (
        category: "shape" | "color" | "type" | "origin" | "productType",
        value: string
    ) => {
        setFilters((prev) => {
            const currentValues = prev[category] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];
            return { ...prev, [category]: newValues };
        });
    };

    const handleCaratChange = (newCarat: [number, number]) => {
        setFilters((prev) => ({ ...prev, carat: newCarat }));
    };

    const handleCaratInputChange = (index: 0 | 1, value: string) => {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            const newCarat = [...filters.carat] as [number, number];
            newCarat[index] = numValue;
            handleCaratChange(newCarat);
        }
    };

    const getActiveFiltersCount = () => {
        const { shape, color, carat, type, origin } = filters;
        let count = shape.length + color.length + type.length + origin.length;
        if (carat[0] !== 0.5 || carat[1] !== 7.5) {
            count++;
        }
        return count;
    };

    const clearSpecificFilter = (
        category: keyof FilterState,
        value?: string
    ) => {
        if (category === "carat") {
            handleCaratChange([0.5, 7.5]);
        } else if (value) {
            handleMultiSelectChange(category, value);
        }
    };

    const clearFilters = () => {
        const clearedFilters = {
            shape: [],
            color: [],
            carat: [0.5, 7.5] as [number, number],
            type: [],
            origin: [],
            productType: initialFilters?.productType || [], // Keep initial productType
        };
        setFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };

    const searchWithFilters = () => {
        onFiltersChange(filters);
    };

    return (
        <div className=" p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-12 grid-rows-2 gap-4">
                {/* Shape Filter */}
                <div className="col-span-12 row-span-2 md:col-span-5 ">
                    <div className="bg-[#C49A6C] text-white px-4 py-2 rounded-t-md text-sm font-medium">
                        Shape
                    </div>
                    <div className="bg-white p-4 rounded-b-md border border-t-0 border-gray-200">
                        <div className="grid grid-cols-5 gap-3">
                            {shapeOptions.map((shape) => (
                                <div
                                    key={shape.value}
                                    className={`p-2 border rounded-md cursor-pointer transition-all text-center ${
                                        filters.shape.includes(shape.value)
                                            ? "border-2 border-[#C49A6C] bg-[#C49A6C]/10"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() =>
                                        handleMultiSelectChange(
                                            "shape",
                                            shape.value
                                        )
                                    }
                                >
                                    <div className="w-12 h-12 mx-auto mb-1 relative">
                                        <Image
                                            src={shape.image}
                                            alt={shape.label}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-600">
                                        {shape.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Color and Carat Filters */}
                <div className="  col-span-12 row-span-1 md:col-span-7 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Color Filter */}
                        <div>
                            <div className="bg-primary text-white px-4 py-2 rounded-t-md text-sm font-medium">
                                Color
                            </div>
                            <div className="bg-white p-4 rounded-b-md border border-t-0 border-gray-200 h-[124px] flex items-center">
                                <div className="flex flex-wrap gap-2">
                                    {colorGrades.map((color) => (
                                        <div
                                            key={color}
                                            className={`p-2 border rounded-md cursor-pointer transition-all text-center w-10 h-10 flex items-center justify-center ${
                                                filters.color.includes(color)
                                                    ? "border-2 border-[#C49A6C] bg-[#C49A6C]/10"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            onClick={() =>
                                                handleMultiSelectChange(
                                                    "color",
                                                    color
                                                )
                                            }
                                        >
                                            <span className="text-sm font-medium text-gray-700">
                                                {color}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Carat Filter */}
                        <div>
                            <div className="bg-[#C49A6C] text-white px-4 py-2 rounded-t-md text-sm font-medium">
                                Carat
                            </div>
                            <div className="bg-white p-4 rounded-b-md border border-t-0 border-gray-200 h-[124px] flex flex-col justify-center">
                                <Slider
                                    value={filters.carat}
                                    onValueChange={handleCaratChange}
                                    max={10}
                                    min={0}
                                    step={0.1}
                                    className="w-full"
                                />
                                <div className="flex justify-between items-center mt-3 gap-2">
                                    <Input
                                        type="number"
                                        value={filters.carat[0]}
                                        onChange={(e) =>
                                            handleCaratInputChange(
                                                0,
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-8 text-center"
                                        step="0.1"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <Input
                                        type="number"
                                        value={filters.carat[1]}
                                        onChange={(e) =>
                                            handleCaratInputChange(
                                                1,
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-8 text-center"
                                        step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type and Origin Filters */}
                <div className=" col-span-12 row-span-1 md:col-span-7 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="bg-[#C49A6C] text-white px-4 py-2 rounded-t-md text-sm font-medium">
                                Type
                            </div>
                            <div className="bg-white p-4 rounded-b-md border border-t-0 border-gray-200">
                                <Select
                                    onValueChange={(value) =>
                                        handleMultiSelectChange("type", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Enter your Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {typeOptions.map((opt) => (
                                            <SelectItem
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <div className="bg-primary text-white px-4 py-2 rounded-t-md text-sm font-medium">
                                Origin
                            </div>
                            <div className="bg-white p-4 rounded-b-md border border-t-0 border-gray-200">
                                <Select
                                    onValueChange={(value) =>
                                        handleMultiSelectChange("origin", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Enter your Origin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {originOptions.map((opt) => (
                                            <SelectItem
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
                <div className="my-6 p-4 bg-white/50 rounded-md border border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        {filters.shape.map((shape) => (
                            <Badge
                                key={shape}
                                variant="outline"
                                className="pr-1 bg-white"
                            >
                                Shape: {shape}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-red-100 rounded-full"
                                    onClick={() =>
                                        clearSpecificFilter("shape", shape)
                                    }
                                >
                                    <X className="h-3 w-3 text-red-500" />
                                </Button>
                            </Badge>
                        ))}
                        {filters.color.map((color) => (
                            <Badge
                                key={color}
                                variant="outline"
                                className="pr-1 bg-white"
                            >
                                Color: {color}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-red-100 rounded-full"
                                    onClick={() =>
                                        clearSpecificFilter("color", color)
                                    }
                                >
                                    <X className="h-3 w-3 text-red-500" />
                                </Button>
                            </Badge>
                        ))}
                        {(filters.carat[0] !== 0.5 ||
                            filters.carat[1] !== 7.5) && (
                            <Badge variant="outline" className="pr-1 bg-white">
                                Carat: {filters.carat[0]}-{filters.carat[1]}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-red-100 rounded-full"
                                    onClick={() => clearSpecificFilter("carat")}
                                >
                                    <X className="h-3 w-3 text-red-500" />
                                </Button>
                            </Badge>
                        )}
                        {filters.type.map((type) => (
                            <Badge
                                key={type}
                                variant="outline"
                                className="pr-1 bg-white"
                            >
                                Type: {type}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-red-100 rounded-full"
                                    onClick={() =>
                                        clearSpecificFilter("type", type)
                                    }
                                >
                                    <X className="h-3 w-3 text-red-500" />
                                </Button>
                            </Badge>
                        ))}
                        {filters.origin.map((origin) => (
                            <Badge
                                key={origin}
                                variant="outline"
                                className="pr-1 bg-white"
                            >
                                Origin: {origin}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-red-100 rounded-full"
                                    onClick={() =>
                                        clearSpecificFilter("origin", origin)
                                    }
                                >
                                    <X className="h-3 w-3 text-red-500" />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="bg-transparent hover:bg-gray-100 text-gray-700 border-gray-400"
                    disabled={loading}
                >
                    CLEAR
                </Button>
                <Button
                    variant="outline"
                    className="bg-transparent hover:bg-gray-100 text-gray-700 border-gray-400"
                    disabled={loading}
                >
                    SAVE
                </Button>
                <Button
                    onClick={searchWithFilters}
                    className="bg-primary hover:bg-primary text-white px-8"
                    disabled={loading}
                >
                    SEARCH
                </Button>
            </div>
        </div>
    );
}
