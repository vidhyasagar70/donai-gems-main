import { z } from "zod";

// Schema for a single quotation, based on apis.md
export const quotationSchema = z.object({
    quotationId: z.string(),
    carat: z.number(),
    noOfPieces: z.number().int(),
    quotePrice: z.number(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
    submittedAt: z.string().datetime().or(z.date()),
    approvedAt: z.string().datetime().or(z.date()).optional().nullable(),
    rejectedAt: z.string().datetime().or(z.date()).optional().nullable(),
    rejectionReason: z.string().optional().nullable(),
});

// Main user schema, based on actual API response
export const userSchema = z.object({
    _id: z.string().optional(), // MongoDB ID
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional().nullable(),
    role: z.enum(["USER", "ADMIN"]),
    status: z.enum(["PENDING", "APPROVED", "SUSPENDED", "REJECTED", "ACTIVE"]), // Note: API uses APPROVED not ACTIVE
    isVip: z.boolean().default(false),
    isVerified: z.boolean().default(false),
    quotations: z.array(quotationSchema).optional(),
    createdAt: z.string().datetime().or(z.date()),
    updatedAt: z.string().datetime().or(z.date()),
    __v: z.number().optional(),
    otp: z.string().optional(),
    otpExpires: z.string().datetime().or(z.date()).optional(),
    customerData: z
        .object({
            firstName: z.string(),
            lastName: z.string(),
            phoneNumber: z.string(),
            countryCode: z.string(),
            address: z.object({
                street: z.string(),
                city: z.string(),
                state: z.string(),
                postalCode: z.string(),
                country: z.string(),
            }),
            businessInfo: z.object({
                companyName: z.string(),
                businessType: z.string(),
                vatNumber: z.string(),
                websiteUrl: z.string().optional(),
            }),
            submittedAt: z.string().datetime().or(z.date()),
        })
        .optional(),
});

// Export the inferred types for use in your application
export type Quotation = z.infer<typeof quotationSchema>;
export type User = z.infer<typeof userSchema>;
