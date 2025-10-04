"use client";

import * as React from "react";
import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Copy,
    Eye,
    MoreHorizontal,
    Pencil,
    Trash2,
    Upload,
} from "lucide-react";
import { gemSchema, Gem } from "@/lib/validations/gems-Schema";
import { EditGemModal } from "@/components/modals/EditGemModal";
import { DeleteGemDialog } from "@/components/modals/DeleteGemDialog";
import { UploadFilesModal } from "@/components/modals/UploadFilesModal";

interface GemRowActionsProps<TData> {
    row: Row<TData>;
    onRefresh?: () => void; // Add optional refresh callback
}

export function DataTableRowActions<TData>({
    row,
    onRefresh,
}: GemRowActionsProps<TData>) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Safe parsing with error handling
    const parseResult = gemSchema.safeParse(row.original);

    if (!parseResult.success) {
        console.error("Gem data parsing failed:", parseResult.error);
        console.log("Raw data:", row.original);

        // Fallback: try to access basic properties directly
        const rawData = row.original as any;
        const gemId = rawData._id || rawData.id || "unknown";
        const stockId = rawData["Stock-Id"] || rawData.stockId || "unknown";

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(gemId)}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    const gem = parseResult.data;

    const handleEditSuccess = () => {
        console.log("✅ Gem edit successful, refreshing data...");
        if (onRefresh) {
            alert("Gem updated successfully!");
            window.location.reload();
        }
    };

    const handleDeleteSuccess = () => {
        console.log("✅ Gem delete successful, refreshing data...");
        if (onRefresh) {
            alert("Gem deleted successfully");
            window.location.reload();
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            const gem = row.original as Gem;
                            const stockId =
                                gem.stockId ||
                                (gem as any)["Stock-Id"] ||
                                "No Stock Id";
                            navigator.clipboard.writeText(stockId);
                        }}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Gem ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Gem
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Gem
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setIsUploadModalOpen(true)}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Files
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit Modal */}
            <EditGemModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditSuccess}
                gem={gem}
            />

            {/* Delete Dialog */}
            <DeleteGemDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onSuccess={handleDeleteSuccess}
                gem={gem}
            />

            {/* Upload Files Modal */}
            <UploadFilesModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSuccess={onRefresh}
                gem={gem}
            />
        </>
    );
}
