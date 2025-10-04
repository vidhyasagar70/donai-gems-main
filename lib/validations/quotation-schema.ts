import { z } from "zod";

export const quotationSchema = z.object({
    _id: z.string(),
    quotationId: z.string(),
    user: z.string(), // User ID
    carat: z.number(),
    noOfPieces: z.number(),
    quotePrice: z.number(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
    submittedAt: z.string().datetime(),
    approvedAt: z.string().datetime().optional(),
    rejectedAt: z.string().datetime().optional(),
    rejectionReason: z.string().optional(),
    productId: z.string().optional(),
});

export type Quotation = z.infer<typeof quotationSchema>;
