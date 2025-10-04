import { z } from "zod";

export const gemSchema = z.object({
    _id: z.string(),
    stockId: z.string().min(1, "Stock ID is required"),
    productType: z.enum(["jewelry", "Jewelry", "gem", "Gem", "GEM"]),
    category: z.string().min(1, "Category is required"),
    stoneType: z.string().min(1, "Stone type is required"),
    color: z.string().min(1, "Color is required"),
    shape: z.string().min(1, "Shape is required"),
    carat: z.number().min(0, "Carat must be greater than or equal to 0"),
    origin: z.string().min(1, "Origin is required"),
    treatment: z.string().min(1, "Treatment is required"),
    availability: z.boolean(),
    certificate: z.string().min(1, "Certificate is required"),
    measurement: z.string().min(1, "Measurement is required"),
    details: z.string().min(1, "Details is required"),
    description: z.string().min(1, "Description is required"),
    imageUrls: z.array(z.string()).default([]),
    videoUrls: z.array(z.string()).default([]),
    certificateUrls: z.array(z.string()).default([]),
    createdAt: z.string().datetime().or(z.date()),
    updatedAt: z.string().datetime().or(z.date()),
    __v: z.number().optional(),
});

export const gemsArraySchema = z.array(gemSchema);

export type Gem = z.infer<typeof gemSchema>;
export type GemsArray = z.infer<typeof gemsArraySchema>;

// Schema for creating a new gem (without _id, createdAt, updatedAt, __v)
export const createGemSchema = gemSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
    __v: true,
    imageUrls: true,
    videoUrls: true,
    certificateUrls: true,
});

export type CreateGem = z.infer<typeof createGemSchema>;

// Schema for updating a gem (all fields optional except _id)
export const updateGemSchema = gemSchema.partial().extend({
    _id: z.string(),
});

export type UpdateGem = z.infer<typeof updateGemSchema>;
