"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGemSchema, CreateGem, Gem } from "@/lib/validations/gems-Schema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { gemsApi } from "@/services/gems";
import { FileUploader } from "@/components/ui/FileUploader";

interface AddGemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddGemModal({ isOpen, onClose, onSuccess }: AddGemModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createdGem, setCreatedGem] = useState<Gem | null>(null);
    const form = useForm<CreateGem>({
        resolver: zodResolver(createGemSchema),
        defaultValues: {
            stockId: "",
            productType: "gem",
            category: "loose stone",
            stoneType: "",
            color: "red",
            shape: "oval",
            carat: 0,
            origin: "",
            treatment: "no heat",
            availability: true,
            certificate: "GIA",
            measurement: "",
            details: "",
            description: "",
        },
    });

    const onSubmit = async (data: CreateGem) => {
        try {
            setIsSubmitting(true);

            // Convert all string fields to lowercase
            const lowercaseData: CreateGem = {
                ...data,
                stockId: data.stockId.toLowerCase(),
                productType: data.productType,
                category: data.category.toLowerCase(),
                stoneType: data.stoneType.toLowerCase(),
                color: data.color.toLowerCase(),
                shape: data.shape.toLowerCase(),
                origin: data.origin.toLowerCase(),
                treatment: data.treatment.toLowerCase(),
                certificate: data.certificate.toLowerCase(),
                measurement: data.measurement.toLowerCase(),
                details: data.details.toLowerCase(),
                description: data.description.toLowerCase(),
            };

            const response = await gemsApi.createGem(lowercaseData);
            if (response.success) {
                toast.success(
                    "Step 1: Gem created successfully! Now upload files."
                );
                setCreatedGem(response.data); // Move to step 2
                onSuccess(); // Refresh the main table in the background
            } else {
                toast.error(response.message || "Failed to create gem");
            }
        } catch (error) {
            console.error("Error creating gem:", error);
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ||
                        error.response?.data?.error ||
                        "Failed to create gem"
                );
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            form.reset();
            setCreatedGem(null); // Reset to step 1
            onClose();
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    {!createdGem ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    Add New Gem (Step 1 of 2)
                                </DialogTitle>
                                <DialogDescription>
                                    Fill in the details to add a new gem to the
                                    inventory.
                                </DialogDescription>
                            </DialogHeader>

                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Stock ID */}
                                        <FormField
                                            control={form.control}
                                            name="stockId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Stock ID *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="GEM001"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Product Type */}
                                        <FormField
                                            control={form.control}
                                            name="productType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Product Type *
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select product type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Jewelry">
                                                                jewelry
                                                            </SelectItem>

                                                            <SelectItem value="Gem">
                                                                gem
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Category */}
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Category *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="loose stone, necklace, ring..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Stone Type */}
                                        <FormField
                                            control={form.control}
                                            name="stoneType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Stone Type *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ruby, Sapphire, Emerald..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Color */}
                                        <FormField
                                            control={form.control}
                                            name="color"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Color *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Red, Blue, Green..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Shape */}
                                        <FormField
                                            control={form.control}
                                            name="shape"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Shape *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="oval, round, cushion..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Carat */}
                                        <FormField
                                            control={form.control}
                                            name="carat"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Carat Weight *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.0001"
                                                            min="0"
                                                            placeholder="2.50"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Origin */}
                                        <FormField
                                            control={form.control}
                                            name="origin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Origin *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Myanmar, Sri Lanka, Thailand..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Treatment */}
                                        <FormField
                                            control={form.control}
                                            name="treatment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Treatment *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="no heat, heated, treated..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Certificate */}
                                        <FormField
                                            control={form.control}
                                            name="certificate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Certificate *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="GIA, GRS, GUBELIN, SSEF..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Measurement - Full width */}
                                    <FormField
                                        control={form.control}
                                        name="measurement"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Measurement *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="8.0x8.0x5.0mm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Details */}
                                    <FormField
                                        control={form.control}
                                        name="details"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Details *</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Technical details about the gem..."
                                                        rows={3}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Description */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Description *
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="General description of the gem..."
                                                        rows={3}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Availability */}
                                    <FormField
                                        control={form.control}
                                        name="availability"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Availability
                                                    </FormLabel>
                                                    <div className="text-sm text-muted-foreground">
                                                        Mark if this gem is
                                                        available for sale
                                                    </div>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleClose}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            {isSubmitting
                                                ? "Creating..."
                                                : "Create and Continue"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    Upload Files for {createdGem.stockId} (Step
                                    2 of 2)
                                </DialogTitle>
                                <DialogDescription>
                                    Upload images, videos, and certificates for
                                    the new gem.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                                <FileUploader
                                    fileType="images"
                                    stockId={createdGem._id}
                                    onUploadSuccess={onSuccess}
                                />
                                <FileUploader
                                    fileType="videos"
                                    stockId={createdGem._id}
                                    onUploadSuccess={onSuccess}
                                />
                                <FileUploader
                                    fileType="certificates"
                                    stockId={createdGem._id}
                                    onUploadSuccess={onSuccess}
                                />
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="default"
                                    onClick={handleClose}
                                >
                                    Finish
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
