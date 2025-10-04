import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Gem } from "@/lib/validations/gems-Schema";

interface FilterState {
    shape: string[];
    color: string[];
    carat: [number, number];
    type: string[];
    origin: string[];
    productType?: string[]; // Add this new field
}

interface ClientGemsState {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
    filters: FilterState;
    searchTerm: string;
}

interface UseClientGemsReturn {
    gems: Gem[];
    loading: boolean;
    error: string | null;
    totalCount: number;
    pageCount: number;
    currentPage: number;
    refetch: () => void;
    updateFilters: (filters: FilterState) => void;
    updateSearch: (searchTerm: string) => void;
    updateSort: (sortBy: string, sortOrder: "asc" | "desc") => void;
    updatePage: (page: number) => void;
    updatePageSize: (limit: number) => void;
    initializeFromParams: (urlFilters: Partial<FilterState>) => void; // Add this
    paginationMeta: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null;
}

export function useClientGems(): UseClientGemsReturn {
    const [gems, setGems] = useState<Gem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [paginationMeta, setPaginationMeta] = useState<{
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null>(null);

    const [clientState, setClientState] = useState<ClientGemsState>({
        page: 1,
        limit: 6,
        sortBy: "createdAt",
        sortOrder: "desc",
        filters: {
            shape: [],
            color: [],
            carat: [0, 10],
            type: [],
            origin: [],
        },
        searchTerm: "",
    });

    const isInitialLoad = useRef(true);

    const buildQueryParams = useCallback((state: ClientGemsState) => {
        const params = new URLSearchParams();

        // Pagination
        params.append("page", state.page.toString());
        params.append("limit", state.limit.toString());

        // Sorting
        params.append("sortBy", state.sortBy);
        params.append("sortOrder", state.sortOrder);

        // Search term
        if (state.searchTerm.trim()) {
            params.append("searchTerm", state.searchTerm.trim());
        }

        // Filters
        const { filters } = state;

        // Shape filter
        if (filters.shape.length > 0) {
            filters.shape.forEach((shape) => {
                params.append("shape", shape);
            });
        }

        // Color filter
        if (filters.color.length > 0) {
            filters.color.forEach((color) => {
                params.append("color", color);
            });
        }

        // Carat range filter
        if (filters.carat[0] !== 0 || filters.carat[1] !== 10) {
            params.append("caratMin", filters.carat[0].toString());
            params.append("caratMax", filters.carat[1].toString());
        }

        // Type filter (mapped to stoneType for API)
        if (filters.type.length > 0) {
            filters.type.forEach((type) => {
                params.append("stoneType", type);
            });
        }

        // Product Type filter
        if (filters.productType && filters.productType.length > 0) {
            filters.productType.forEach((productType) => {
                params.append("productType", productType);
            });
        }

        // Origin filter
        if (filters.origin.length > 0) {
            filters.origin.forEach((origin) => {
                params.append("origin", origin);
            });
        }

        // Always show only available gems for clients
        params.append("availability", "true");

        return params;
    }, []);

    // Add new function to initialize from URL params
    const initializeFromParams = useCallback(
        (urlFilters: Partial<FilterState>) => {
            console.log("🔗 Initializing from URL params:", urlFilters);

            setClientState((prev) => ({
                ...prev,
                filters: {
                    shape: urlFilters.shape || [],
                    color: urlFilters.color || [],
                    carat: urlFilters.carat || [0, 10],
                    type: urlFilters.type || [],
                    origin: urlFilters.origin || [],
                    productType: urlFilters.productType || [], // Add this
                },
                page: 1, // Reset to first page
            }));
        },
        []
    );

    const fetchGems = useCallback(
        async (state: ClientGemsState) => {
            try {
                setLoading(true);
                setError(null);

                const queryParams = buildQueryParams(state);

                // Determine if we need search endpoint
                const hasFilters =
                    state.searchTerm.trim() ||
                    state.filters.shape.length > 0 ||
                    state.filters.color.length > 0 ||
                    state.filters.carat[0] !== 0 ||
                    state.filters.carat[1] !== 10 ||
                    state.filters.type.length > 0 ||
                    state.filters.origin.length > 0 ||
                    (state.filters.productType &&
                        state.filters.productType.length > 0); // Add this check

                const endpoint = hasFilters ? "/api/gems/search" : "/api/gems";

                console.log(`🔍 Fetching client gems from: ${endpoint}`, {
                    page: state.page,
                    limit: state.limit,
                    hasFilters,
                    queryString: queryParams.toString(),
                    timestamp: new Date().toISOString(),
                });

                const response = await axios.get(
                    `${
                        process.env.NEXT_PUBLIC_API_BASE_URL
                    }${endpoint}?${queryParams.toString()}`
                );

                if (!response.data.success) {
                    throw new Error(
                        response.data.error || "Failed to fetch gems"
                    );
                }

                const responseData = response.data;
                setGems(responseData.data as Gem[]);

                // Handle pagination metadata
                if (responseData.pagination) {
                    setPaginationMeta(responseData.pagination);
                    setPageCount(responseData.pagination.totalPages);
                    setTotalCount(responseData.pagination.totalRecords);
                } else {
                    const totalRecords =
                        responseData.totalRecords ||
                        responseData.totalFilteredRecords ||
                        responseData.data.length;

                    setTotalCount(totalRecords);
                    const calculatedPageCount = Math.ceil(
                        totalRecords / state.limit
                    );
                    setPageCount(calculatedPageCount);

                    setPaginationMeta({
                        currentPage: state.page,
                        totalPages: calculatedPageCount,
                        totalRecords: totalRecords,
                        recordsPerPage: state.limit,
                        hasNextPage: state.page < calculatedPageCount,
                        hasPrevPage: state.page > 1,
                    });
                }

                console.log("✅ Client gems fetched successfully:", {
                    count: responseData.data.length,
                    totalRecords:
                        responseData.pagination?.totalRecords ||
                        responseData.totalRecords,
                    appliedFilters: responseData.appliedFilters,
                });
            } catch (err) {
                console.error("❌ Error fetching client gems:", err);
                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data?.message ||
                            err.response?.data?.error ||
                            `API Error: ${err.response?.status} - ${err.message}`
                    );
                } else {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "An unknown error occurred"
                    );
                }
            } finally {
                setLoading(false);
            }
        },
        [buildQueryParams]
    );

    // Update functions
    const updateFilters = useCallback((filters: FilterState) => {
        console.log("🔄 Updating filters:", filters);
        setClientState((prev) => ({ ...prev, filters, page: 1 })); // Reset to page 1 when filtering
    }, []);

    const updateSearch = useCallback((searchTerm: string) => {
        console.log("🔍 Updating search term:", searchTerm);
        setClientState((prev) => ({ ...prev, searchTerm, page: 1 })); // Reset to page 1 when searching
    }, []);

    const updateSort = useCallback(
        (sortBy: string, sortOrder: "asc" | "desc") => {
            console.log("📊 Updating sort:", { sortBy, sortOrder });
            setClientState((prev) => ({ ...prev, sortBy, sortOrder }));
        },
        []
    );

    const updatePage = useCallback((page: number) => {
        console.log("📄 Updating page:", page);
        setClientState((prev) => ({ ...prev, page }));
    }, []);

    const updatePageSize = useCallback((limit: number) => {
        console.log("📏 Updating page size:", limit);
        setClientState((prev) => ({ ...prev, limit, page: 1 })); // Reset to page 1 when changing page size
    }, []);

    const refetch = useCallback(() => {
        console.log("🔄 Manual refetch requested");
        fetchGems(clientState);
    }, [fetchGems, clientState]);

    // Initial load
    useEffect(() => {
        if (isInitialLoad.current) {
            console.log("🚀 Initial client gems load");
            fetchGems(clientState);
            isInitialLoad.current = false;
        }
    }, []);

    // Fetch when state changes
    useEffect(() => {
        if (!isInitialLoad.current) {
            console.log("📊 Client state changed, fetching gems:", clientState);

            const timeoutId = setTimeout(() => {
                fetchGems(clientState);
            }, 300); // Debounce for better UX

            return () => clearTimeout(timeoutId);
        }
    }, [clientState, fetchGems]);

    return {
        gems,
        loading,
        error,
        totalCount,
        pageCount,
        currentPage: clientState.page,
        refetch,
        updateFilters,
        updateSearch,
        updateSort,
        updatePage,
        updatePageSize,
        initializeFromParams, // Add this
        paginationMeta,
    };
}
