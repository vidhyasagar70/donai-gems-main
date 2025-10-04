"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Search } from "lucide-react";
import { Gem } from "@/lib/validations/gems-Schema";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { gemsApi } from "@/services/gems";
import { file } from "zod";
import GemImage from "./GemImage";

interface ClientGemsTableProps {
    gems: Gem[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    onSearchChange: (searchTerm: string) => void;
    onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

export function ClientGemsTable({
    gems,
    loading,
    currentPage,
    totalPages,
    totalRecords,
    recordsPerPage,
    hasNextPage,
    hasPrevPage,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    onSortChange,
}: ClientGemsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [view, setView] = useState<"list" | "visual">("visual");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchChange(searchTerm);
    };

    const handleSortChange = (value: string) => {
        const [newSortBy, newSortOrder] = value.split("-") as [
            string,
            "asc" | "desc"
        ];
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
        onSortChange(newSortBy, newSortOrder);
    };

    const renderLoadingSkeletons = () => {
        return Array.from({ length: recordsPerPage }).map((_, index) => (
            <Card key={index} className="overflow-hidden p-0 rounded-none">
                <CardContent className="p-0">
                    <div className="aspect-square  bg-gray-200 animate-pulse" />
                </CardContent>
            </Card>
        ));
    };

    const renderGemCard = (gem: Gem) => (
        <Link href={`/product/${gem.stockId}`} key={gem._id}>
            <Card
                key={gem._id}
                className="group overflow-hidden  rounded-none hover:shadow-lg transition-all bg-[#FDFAF6] duration-500 p-0 border-primary/50"
            >
                <CardContent className="p-0 rounded-sm ">
                    {/* Gem Image Placeholder */}
                    <div className="aspect-square bg-transparent relative overflow-hidden">
                        <GemImage gem={gem} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                            <span className="text-2xl font-bold text-[#C49A6C]">
                                {gem.stoneType?.charAt(0) || "G"}
                            </span>
                        </div> */}
                        </div>

                        {/* Availability badge */}
                        {/* <Badge
                        variant={gem.availability ? "default" : "secondary"}
                        className={`absolute top-2 left-2 ${
                            gem.availability
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                        {gem.availability ? "Available" : "Sold"}
                    </Badge> */}
                    </div>

                    {/* Gem Details */}
                    {/* <div className="p-4 space-y-2">
                    <div className="flex-col items-center justify-between">
                        <h3 className="pl-2  text-primary font-semibold text-lg truncate mx-auto ">
                            <span>Stock-ID : </span>
                            {gem.stockId}
                        </h3>
                        <div className="flex items-center justify-start ">
                            <Badge
                                variant="outline"
                                className="text-lg border-none text-primary font-semibold"
                            >
                                {gem.productType}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between">
                            <span>Stone:</span>
                            <span className="font-medium">{gem.stoneType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Color:</span>
                            <span className="font-medium">{gem.color}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shape:</span>
                            <span className="font-medium">{gem.shape}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Carat:</span>
                            <span className="font-medium text-[#C49A6C]">
                                {gem.carat} ct
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Origin:</span>
                            <span className="font-medium">{gem.origin}</span>
                        </div>
                        {gem.certificate && (
                            <div className="flex justify-between">
                                <span>Cert:</span>
                                <span className="font-medium">
                                    {gem.certificate}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="pt-2 border-t">
                        <div className="text-xs text-gray-500">
                            {gem.measurement}
                        </div>
                    </div>
                </div> */}
                </CardContent>
            </Card>
            <span className="uppercase"> {gem.description}</span>
        </Link>
    );

    const renderListView = () => (
        <div className="bg-white rounded-lg overflow-hidden shadow">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-primary/30 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Image
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Stock ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Product Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Stone Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Color
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Carat
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Origin
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Treatment
                            </th>
                            {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Availability
                            </th> */}
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Certificate
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                Measurement
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            Array.from({ length: recordsPerPage }).map(
                                (_, index) => (
                                    <tr key={index}>
                                        {Array.from({ length: 13 }).map(
                                            (_, cellIndex) => (
                                                <td
                                                    key={cellIndex}
                                                    className="px-4 py-4"
                                                >
                                                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                )
                            )
                        ) : gems.length > 0 ? (
                            gems.map((gem, index) => (
                                <tr
                                    key={gem._id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-primary/30"
                                    }
                                >
                                    <td className="px-4 py-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                                            <span className="text-sm font-bold text-[#C49A6C]">
                                                {gem.stoneType?.charAt(0) ||
                                                    "G"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                        {gem.stockId}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        <Badge variant="outline">
                                            {gem.productType}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {gem.category}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {gem.stoneType}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {gem.color}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-[#C49A6C]">
                                        {gem.carat} ct
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {gem.origin}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {gem.treatment}
                                    </td>
                                    {/* <td className="px-4 py-4">
                                        <Badge
                                            variant={
                                                gem.availability
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={
                                                gem.availability
                                                    ? "bg-green-500/20 hover:bg-green-600"
                                                    : "bg-red-500 hover:bg-red-600"
                                            }
                                        >
                                            {gem.availability ? "Yes" : "No"}
                                        </Badge>
                                    </td> */}
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {gem.certificate}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {gem.measurement}
                                    </td>
                                    <td className="px-4 py-4">
                                        <Button size="sm" variant="outline">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={13}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No gems found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderEmptyState = () => (
        <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No gems found
                </h3>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Search */}
                {/* <form
                    onSubmit={handleSearchSubmit}
                    className="flex gap-2 flex-1 max-w-md"
                >
                    <Input
                        placeholder="Search by Stock ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" size="sm" disabled={loading}>
                        <Search className="h-4 w-4" />
                    </Button>
                </form> */}

                {/* Controls */}
                <div className="flex items-center gap-4">
                    {/* Sort */}
                    {/* <Select
                        value={`${sortBy}-${sortOrder}`}
                        onValueChange={handleSortChange}
                        disabled={loading}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="createdAt-desc">
                                Newest First
                            </SelectItem>
                            <SelectItem value="createdAt-asc">
                                Oldest First
                            </SelectItem>
                            <SelectItem value="carat-desc">
                                Carat: High to Low
                            </SelectItem>
                            <SelectItem value="carat-asc">
                                Carat: Low to High
                            </SelectItem>
                            <SelectItem value="stockId-asc">
                                Stock ID: A to Z
                            </SelectItem>
                            <SelectItem value="stockId-desc">
                                Stock ID: Z to A
                            </SelectItem>
                        </SelectContent>
                    </Select> */}

                    {/* View Toggle */}
                    {/* <div className="flex border rounded-lg overflow-hidden">
                        <Button
                            variant={view === "visual" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setView("visual")}
                            className="rounded-none"
                        >
                            Visual
                        </Button>
                        <Button
                            variant={view === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setView("list")}
                            className="rounded-none"
                        >
                            List
                        </Button>
                    </div> */}
                </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                {/* <span>
                    Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
                    {Math.min(currentPage * recordsPerPage, totalRecords)} of{" "}
                    {totalRecords.toLocaleString()} gems
                </span> */}
                {/* <Select
                    value={recordsPerPage.toString()}
                    onValueChange={(value) => onPageSizeChange(Number(value))}
                    disabled={loading}
                >
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 per page</SelectItem>
                        <SelectItem value="20">20 per page</SelectItem>
                        <SelectItem value="30">30 per page</SelectItem>
                        <SelectItem value="50">50 per page</SelectItem>
                    </SelectContent>
                </Select> */}
            </div>

            {/* Content */}
            {view === "visual" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading
                        ? renderLoadingSkeletons()
                        : gems.length > 0
                        ? gems.map(renderGemCard)
                        : renderEmptyState()}
                </div>
            ) : (
                renderListView()
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrevPage || loading}
                >
                    Previous
                </Button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                            pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                            pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                        } else {
                            pageNumber = currentPage - 2 + i;
                        }

                        return (
                            <Button
                                key={pageNumber}
                                variant={
                                    currentPage === pageNumber
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => onPageChange(pageNumber)}
                                disabled={loading}
                                className="w-10"
                            >
                                {pageNumber}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage || loading}
                >
                    Next
                </Button>
            </div>

            {/* Load More Button for mobile */}
            <div className="flex justify-center md:hidden">
                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage || loading}
                    className="w-full max-w-sm"
                >
                    {loading ? "Loading..." : "Load More"}
                </Button>
            </div>
        </div>
    );
}
