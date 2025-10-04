"use client";

import React, { useState, useEffect } from "react";
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
import { gemsApi } from "@/services/gems";

interface EditGemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    gem: Gem;
}

export function EditGemModal({
    isOpen,
    onClose,
    onSuccess,
    gem,
}: EditGemModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Update form values when gem prop changes
    useEffect(() => {
        if (gem && isOpen) {
            form.reset({
                stockId: gem.stockId,
                productType: gem.productType as any,
                category: gem.category,
                stoneType: gem.stoneType,
                color: gem.color,
                shape: gem.shape,
                carat: gem.carat,
                origin: gem.origin,
                treatment: gem.treatment,
                availability: gem.availability,
                certificate: gem.certificate,
                measurement: gem.measurement,
                details: gem.details,
                description: gem.description,
            });
        }
    }, [gem, isOpen, form]);

    const onSubmit = async (data: CreateGem) => {
        try {
            setIsSubmitting(true);

            const response = await gemsApi.updateGem(gem._id, data);

            if (response.success) {
                toast.success("Gem updated successfully!");
                onSuccess();
                onClose();
            } else {
                toast.error(response.message || "Failed to update gem");
            }
        } catch (error) {
            console.error("Error updating gem:", error);
            toast.error("Failed to update gem");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Gem</DialogTitle>
                    <DialogDescription>
                        Update the gem details below.
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
                                        <FormLabel>Stock ID *</FormLabel>
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
                                        <FormLabel>Product Type *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select product type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {/* <SelectItem value="jewelry">
                                                    jewelry
                                                </SelectItem> */}
                                                <SelectItem value="Jewelry">
                                                    Jewelry
                                                </SelectItem>
                                                {/* <SelectItem value="gem">
                                                    gem
                                                </SelectItem> */}
                                                <SelectItem value="Gem">
                                                    Gem
                                                </SelectItem>
                                                {/* <SelectItem value="GEM">
                                                    GEM
                                                </SelectItem> */}
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
                                        <FormLabel>Category *</FormLabel>
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
                                        <FormLabel>Stone Type *</FormLabel>
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
                                        <FormLabel>Color *</FormLabel>
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
                                        <FormLabel>Shape *</FormLabel>
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
                                        <FormLabel>Carat Weight *</FormLabel>
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
                                                            e.target.value
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
                                        <FormLabel>Origin *</FormLabel>
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
                                        <FormLabel>Treatment *</FormLabel>
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
                                        <FormLabel>Certificate *</FormLabel>
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
                                    <FormLabel>Measurement *</FormLabel>
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
                                    <FormLabel>Description *</FormLabel>
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
                                            Mark if this gem is available for
                                            sale
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
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
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isSubmitting ? "Updating..." : "Update Gem"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
