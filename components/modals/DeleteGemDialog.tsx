"use client";

import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { gemsApi } from "@/services/gems";
import { Gem } from "@/lib/validations/gems-Schema";

interface DeleteGemDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    gem: Gem;
}

export function DeleteGemDialog({
    isOpen,
    onClose,
    onSuccess,
    gem,
}: DeleteGemDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            const response = await gemsApi.deleteGem(gem._id);

            if (response.success) {
                toast.success("Gem deleted successfully!");
                onSuccess();
                onClose();
            } else {
                toast.error(response.message || "Failed to delete gem");
            }
        } catch (error) {
            console.error("Error deleting gem:", error);
            toast.error("Failed to delete gem");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Gem</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this gem? This action
                        cannot be undone.
                        <br />
                        <br />
                        <strong>Stock ID:</strong> {gem.stockId}
                        <br />
                        <strong>Stone Type:</strong> {gem.stoneType}
                        <br />
                        <strong>Carat:</strong> {gem.carat} ct
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
