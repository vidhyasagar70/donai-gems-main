"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/gems-row-actions";
import { Gem } from "@/lib/validations/gems-Schema";
import {
    productType,
    productTypes,
    categories,
    stoneTypes,
    colors,
    shapes,
    origins,
    treatments,
    certificates,
} from "@/components/filter/gemsFilter";
import { toast } from "sonner";
import { useGems } from "@/hooks/useGems";
import GemImage from "../client/GemImage";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";

export const gemsColumns: ColumnDef<Gem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "gemImage",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gem Image" />
        ),
        cell: ({ row }) => (
            <div className="w-10 font-mono text-xs">
                {<GemImage gem={row.original} />}
            </div>
        ),
    },
    {
        accessorKey: "View",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="View" />
        ),
        cell: ({ row }) => (
            <div className="w-10 font-mono text-xs">
                <Link href={`product/${row.original.stockId}`}>
                    {" "}
                    <EyeIcon className="h-5 w-5 text-black" />
                </Link>
            </div>
        ),
    },
    {
        accessorKey: "stockId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock ID" />
        ),
        cell: ({ row }) => (
            <div className="w-[120px] font-mono text-xs">
                {row.getValue("stockId")}
            </div>
        ),
    },
    {
        accessorKey: "productType",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Type" />
        ),
        cell: ({ row }) => {
            const productTypeValue = row.getValue("productType") as string;
            return (
                <div className="flex w-[100px] items-center">
                    <span className="capitalize">{productTypeValue}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            const categoryValue = row.getValue("category") as string;
            return (
                <div className="flex w-[100px] items-center">
                    <span className="capitalize">{categoryValue}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "stoneType",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stone Type" />
        ),
        cell: ({ row }) => {
            const stoneTypeValue = row.getValue("stoneType") as string;
            return (
                <div className="flex w-[120px] items-center">
                    <span className="whitespace-pre-wrap">
                        {stoneTypeValue}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "color",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Color" />
        ),
        cell: ({ row }) => {
            const colorValue = row.getValue("color") as string;
            return (
                <div className="flex w-[100px] items-center">
                    <span className="whitespace-pre-wrap capitalize">
                        {colorValue}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "shape",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shape" />
        ),
        cell: ({ row }) => {
            const shapeValue = row.getValue("shape") as string;
            return (
                <div className="flex w-[100px] items-center">
                    <span className="whitespace-pre-wrap capitalize">
                        {shapeValue}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "carat",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Carat" />
        ),
        cell: ({ row }) => {
            const caratValue = row.getValue("carat") as number;
            return (
                <div className="w-[80px] whitespace-pre-wrap">
                    {caratValue.toFixed(2)} ct
                </div>
            );
        },
    },
    {
        accessorKey: "origin",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Origin" />
        ),
        cell: ({ row }) => {
            const originValue = row.getValue("origin") as string;
            return (
                <div className="flex w-[100px] items-center">
                    <span className="whitespace-pre-wrap">{originValue}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "treatment",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Treatment" />
        ),
        cell: ({ row }) => {
            const treatmentValue = row.getValue("treatment") as string;
            return (
                <div className="flex w-[120px] items-center">
                    <span className="whitespace-pre-wrap text-xs">
                        {treatmentValue}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "certificate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Certificate" />
        ),
        cell: ({ row }) => {
            const certificateValue = row.getValue("certificate") as string;
            return (
                <div className="flex w-[80px] items-center">
                    <Badge variant="outline" className="text-xs">
                        {certificateValue}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "measurement",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Measurement" />
        ),
        cell: ({ row }) => {
            const measurementValue = row.getValue("measurement") as string;
            return <div className="w-[150px] text-xs">{measurementValue}</div>;
        },
    },
    {
        accessorKey: "details",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Details" />
        ),
        cell: ({ row }) => {
            const detailsValue = row.getValue("details") as string;
            const truncatedDetails =
                detailsValue.length > 50
                    ? `${detailsValue.substring(0, 50)}...`
                    : detailsValue;
            return (
                <div className="w-[200px] text-xs" title={detailsValue}>
                    <span className="whitespace-pre-wrap">
                        {truncatedDetails}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const cellValue = row.getValue(id) as string;
            return cellValue.toLowerCase().includes(value.toLowerCase());
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => {
            const descriptionValue = row.getValue("description") as string;
            const truncatedDescription =
                descriptionValue.length > 50
                    ? `${descriptionValue.substring(0, 50)}...`
                    : descriptionValue;
            return (
                <div className="w-[200px] text-xs" title={descriptionValue}>
                    <span className="whitespace-pre-wrap">
                        {truncatedDescription}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const cellValue = row.getValue(id) as string;
            return cellValue.toLowerCase().includes(value.toLowerCase());
        },
    },
    {
        accessorKey: "availability",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Availability" />
        ),
        cell: ({ row }) => {
            const isAvailable = row.getValue("availability") as boolean;
            return (
                <div className="w-[100px]">
                    <Badge
                        variant={isAvailable ? "default" : "secondary"}
                        className={
                            isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }
                    >
                        {isAvailable ? "Available" : "Not Available"}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const cellValue = row.getValue(id) as boolean;
            const normalizedValue = cellValue ?? false;
            return value.includes(normalizedValue);
        },
        enableSorting: true,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as string;
            const date = new Date(createdAt);
            return (
                <div className="w-[100px] text-xs">
                    {date.toLocaleDateString()}
                </div>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated" />
        ),
        cell: ({ row }) => {
            const updatedAt = row.getValue("updatedAt") as string;
            const date = new Date(updatedAt);
            return (
                <div className="w-[100px] text-xs">
                    {date.toLocaleDateString()}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DataTableRowActions
                row={row}
                onRefresh={() => {
                    console.log("🔄 Refreshing gems data");
                }}
            />
        ),
    },
];
