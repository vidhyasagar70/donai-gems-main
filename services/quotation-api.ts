import apiClient from "./axios";
import { Quotation } from "@/lib/validations/quotation-schema";
import { User } from "@/lib/validations/user-schema";

export interface QuotationData {
    // Assuming we link quote to a product
    quotations: String[];
}

export interface QuotationResponse {
    message: string;
    quotations: string[];
}

export interface AdminQuotation {
    userId: string;
    username: string;
    email: string;
    quotations: string[];
    quotationCount: number;
}

export interface AllQuotations {
    users: AdminQuotation[];
    summary: {
        totalUsers: number;
        totalQuotations: number;
    };
}

export interface AllQuotationsResponse {
    success: boolean;
    message: string;
    data: AllQuotations;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export const quotationAPI = {
    /**
     * Submit a new quotation.
     */
    submitQuotation: async (
        data: QuotationData
    ): Promise<QuotationResponse> => {
        const response = await apiClient.post("/api/quotations", data);
        return response.data;
    },

    /**
     * Get all quotations for all users (Admin only).
     */
    getAllQuotations: async (): Promise<AllQuotationsResponse> => {
        const response = await apiClient.get("/api/quotations");
        return response.data;
    },
};
