"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { GemsTableToolbar } from "./gems-toolbar";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    toolbar?: React.ComponentType<{ table: any }>;
    pageCount?: number;
    loading?: boolean;
    onStateChange?: (state: {
        pagination: { pageIndex: number; pageSize: number };
        sorting: Array<{ id: string; desc: boolean }>;
        columnFilters: Array<{ id: string; value: any }>;
    }) => void;
    paginationMeta?: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    toolbar: Toolbar = GemsTableToolbar,
    pageCount = -1,
    loading = false,
    onStateChange,
    paginationMeta,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // FIXED: Use useCallback to stabilize the state change handler
    const handleStateChange = React.useCallback(() => {
        if (onStateChange) {
            onStateChange({
                pagination,
                sorting,
                columnFilters,
            });
        }
    }, [pagination, sorting, columnFilters, onStateChange]);

    // FIXED: Use useEffect with proper debouncing for state changes
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleStateChange();
        }, 150); // Debounce state changes

        return () => clearTimeout(timeoutId);
    }, [handleStateChange]);

    const table = useReactTable({
        data,
        columns,
        pageCount,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),

        // SERVER-SIDE OPERATIONS - All filtering, sorting, pagination handled by server
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,

        // Keep these for UI features (faceted filters, etc.)
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="space-y-4">
            <Toolbar table={table} />
            <div className="rounded-md border">
                <Table className="overflow-x-auto">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                className="bg-primary/40 hover:bg-primary/40"
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            // Loading skeleton
                            Array.from({ length: pagination.pageSize }).map(
                                (_, index) => (
                                    <TableRow key={index}>
                                        {columns.map((_, cellIndex) => (
                                            <TableCell key={cellIndex}>
                                                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            )
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className={`${
                                        row.index % 2 === 0
                                            ? "bg-primary/20"
                                            : "bg-gray-50"
                                    } hover:bg-`}
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination
                table={table}
                paginationMeta={paginationMeta}
            />
        </div>
    );
}
