"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { quotationAPI, QuotationData } from "@/services/quotation-api";

interface RequestQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId?: string;
}

export function RequestQuoteModal({
    isOpen,
    onClose,
    productId,
}: RequestQuoteModalProps) {
    const [inquiry, setInquiry] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInquiry(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Validate inquiry is not empty
        if (!inquiry.trim()) {
            setError("Please enter your inquiry.");
            setIsLoading(false);
            return;
        }

        // Create the quotation data according to API specification
        const quoteData: QuotationData = {
            quotations: [
                (productId ? `Inquiry for - ${productId}:  ` : "") +
                    inquiry.trim(),
            ],
        };

        try {
            await quotationAPI.submitQuotation(quoteData);
            toast("Your quotation has been submitted successfully.");
            setInquiry(""); // Reset form
            onClose();
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                "Failed to submit quotation. Please try again.";
            setError(errorMessage);
            toast(`${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setInquiry(""); // Reset form when closing
        setError(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request a Quote</DialogTitle>
                    <DialogDescription>
                        Fill in your inquiry below to submit your quotation.
                        We'll get back to you shortly.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="inquiry" className="text-right">
                                Inquiry
                            </Label>
                            <Input
                                id="inquiry"
                                name="inquiry"
                                type="text"
                                value={inquiry}
                                onChange={handleInputChange}
                                className="col-span-3"
                                placeholder={`${
                                    productId ? `${productId} - ` : ""
                                }Enter your inquiry...`}
                                required
                            />
                        </div>
                        {error && (
                            <p className="col-span-4 text-red-500 text-sm text-center">
                                {error}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit Quote"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
