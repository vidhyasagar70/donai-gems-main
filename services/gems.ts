import axios from "axios";
import { Gem } from "@/lib/validations/gems-Schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface GemsApiResponse {
    success: boolean;
    message: string;
    data: Gem[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    totalRecords?: number;
    appliedFilters?: Record<string, any>;
    totalFilteredRecords?: number;
}

export interface GemsSearchParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    stockId?: string;
    productType?: string | string[];
    category?: string | string[];
    stoneType?: string | string[];
    color?: string | string[];
    shape?: string | string[];
    origin?: string | string[];
    treatment?: string | string[];
    certificate?: string | string[];
    caratMin?: number;
    caratMax?: number;
    availability?: boolean;
    searchTerm?: string;
}

export interface FilterOptionsResponse {
    success: boolean;
    message: string;
    data: {
        productTypes: string[];
        categories: string[];
        stoneTypes: string[];
        colors: string[];
        shapes: string[];
        origins: string[];
        treatments: string[];
        certificates: string[];
    };
}

export interface fileUploadRequestBody {
    base64: string;
    size: number;
    fileName: string;
    fileType: string;
}

export interface UploadResponse {
    status: number;
    message: string;
    data: {
        imageKeys?: string[];
        videoKeys?: string[];
        certificateKeys?: string[];
    };
}

export interface SignedUrlResponse {
    status: number;
    message: string;
    data: {
        imagesUrls?: string[];
        videoUrls?: string[];
        certificatesUrls?: string[];
    };
}

export interface AllGemsFilesResponse {
    status: number;
    message: string;
    data: Array<{
        id: string;
        imagesUrls: string[];
    }>;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export const gemsApi = {
    // Get all gems with pagination
    getGems: async (
        params: GemsSearchParams = {}
    ): Promise<GemsApiResponse> => {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach((v) => queryParams.append(key, v.toString()));
                } else {
                    queryParams.append(key, value.toString());
                }
            }
        });

        const response = await axios.get(
            `${API_BASE_URL}/api/gems?${queryParams.toString()}`
        );
        return response.data;
    },

    // Search gems with advanced filters
    searchGems: async (
        params: GemsSearchParams = {}
    ): Promise<GemsApiResponse> => {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach((v) => queryParams.append(key, v.toString()));
                } else {
                    queryParams.append(key, value.toString());
                }
            }
        });

        const response = await axios.get(
            `${API_BASE_URL}/api/gems/search?${queryParams.toString()}`
        );
        return response.data;
    },

    // Get filter options for dropdowns
    getFilterOptions: async (): Promise<FilterOptionsResponse> => {
        const response = await axios.get(`${API_BASE_URL}/filter-options`);
        return response.data;
    },

    // Create a new gem
    createGem: async (
        gemData: Omit<
            Gem,
            | "imageUrls"
            | "videoUrls"
            | "certificateUrls"
            | "_id"
            | "createdAt"
            | "updatedAt"
            | "__v"
        >
    ): Promise<{
        success: boolean;
        message: string;
        data: Gem;
    }> => {
        const response = await axios.post(
            `${API_BASE_URL}/api/gems/create`,
            gemData
        );
        return response.data;
    },

    // Update a gem
    updateGem: async (
        id: string,
        gemData: Partial<Gem>
    ): Promise<{
        success: boolean;
        message: string;
        data: Gem;
    }> => {
        const response = await axios.put(
            `${API_BASE_URL}/api/gems/${id}`,
            gemData
        );
        return response.data;
    },

    // Delete a gem
    deleteGem: async (
        id: string
    ): Promise<{
        success: boolean;
        message: string;
    }> => {
        const response = await axios.delete(`${API_BASE_URL}/api/gems/${id}`);
        return response.data;
    },

    // upload gem images
    uploadFilesForGem: async (
        fileType: "images" | "videos" | "certificates",
        stockId: string,
        fileDetails: fileUploadRequestBody[]
    ): Promise<UploadResponse> => {
        const response = await axios.post(
            `${API_BASE_URL}/api/gems/S3Bucket/insert/${fileType}/${stockId}`,
            { fileDetails } // Ensure the body matches the expected format
        );
        return response.data;
    },

    // Get files (signed URLs) for a specific gem
    getFilesForGem: async (
        fileType: "images" | "videos" | "certificates",
        stockId: string,
        key?: string
    ): Promise<SignedUrlResponse> => {
        const url = new URL(
            `${API_BASE_URL}/api/gems/S3Bucket/${fileType}/${stockId}`
        );
        if (key) {
            url.searchParams.append("key", key);
        }
        const response = await axios.get(url.toString());
        return response.data;
    },

    // Get files for all gems with pagination
    getAllGemsFiles: async (
        fileType: "images" | "videos" | "certificates",
        page: number = 1,
        limit: number = 10
    ): Promise<AllGemsFilesResponse> => {
        const url = new URL(`${API_BASE_URL}/api/gems/S3Bucket/${fileType}`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());

        const response = await axios.get(url.toString());
        return response.data;
    },
};
