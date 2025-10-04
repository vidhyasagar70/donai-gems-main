"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import {
    productTypes,
    categories,
    stoneTypes,
    colors,
    shapes,
    treatments,
    certificates,
} from "@/components/filter/gemsFilter";

interface GemsTableToolbarProps<TData> {
    table: Table<TData>;
}

export function GemsTableToolbar<TData>({
    table,
}: GemsTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [searchValue, setSearchValue] = useState("");

    // Sync search input with table filter
    useEffect(() => {
        const stockIdFilter = table
            .getColumn("stockId")
            ?.getFilterValue() as string;
        setSearchValue(stockIdFilter || "");
    }, [table]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        table.getColumn("stockId")?.setFilterValue(value || undefined);
    };

    const handleResetFilters = () => {
        table.resetColumnFilters();
        setSearchValue("");
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search gems by Stock ID..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="h-8 w-[150px] lg:w-[250px] border-primary focus:outline-none focus:ring-0"
                />
                {/* {table.getColumn("productType") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("productType")}
                        title="Product Type"
                        options={productTypes}
                    />
                )} */}
                {table.getColumn("category") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("category")}
                        title="Category"
                        options={categories}
                    />
                )}
                {table.getColumn("stoneType") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("stoneType")}
                        title="Stone Type"
                        options={stoneTypes}
                    />
                )}
                {table.getColumn("color") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("color")}
                        title="Color"
                        options={colors}
                    />
                )}
                {table.getColumn("shape") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("shape")}
                        title="Shape"
                        options={shapes}
                    />
                )}
                {table.getColumn("treatment") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("treatment")}
                        title="Treatment"
                        options={treatments}
                    />
                )}
                {table.getColumn("certificate") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("certificate")}
                        title="Certificate"
                        options={certificates}
                    />
                )}
                {table.getColumn("productType") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("productType")}
                        title="Product Type"
                        options={productTypes}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={handleResetFilters}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
