import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Gem } from "@/lib/validations/gems-Schema";

interface TableState {
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
    sorting: Array<{
        id: string;
        desc: boolean;
    }>;
    columnFilters: Array<{
        id: string;
        value: any;
    }>;
}

interface UseGemsReturn {
    gems: Gem[];
    loading: boolean;
    error: string | null;
    totalCount: number;
    pageCount: number;
    refetch: () => void;
    updateTable: (state: TableState) => void;
    paginationMeta: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null;
}

export function useGems(): UseGemsReturn {
    const [gems, setGems] = useState<Gem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    // Table state
    const [tableState, setTableState] = useState<TableState>({
        pagination: { pageIndex: 0, pageSize: 10 },
        sorting: [],
        columnFilters: [],
    });

    // Use ref to track if this is the initial load
    const isInitialLoad = useRef(true);

    // Add pagination metadata state
    const [paginationMeta, setPaginationMeta] = useState<{
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null>(null);

    // FIXED: Use useCallback with stable dependencies
    const mapColumnToQueryParam = useCallback((columnId: string): string => {
        // Map column IDs to API query parameters based on your gems API
        const mapping: Record<string, string> = {
            stockId: "stockId",
            productType: "productType",
            category: "category",
            stoneType: "stoneType",
            color: "color",
            shape: "shape",
            origin: "origin",
            treatment: "treatment",
            certificate: "certificate",
            availability: "availability",
            carat: "carat",
        };

        return mapping[columnId] || columnId;
    }, []); // Empty dependency array - this function doesn't depend on any state

    const buildQueryParams = useCallback(
        (state: TableState) => {
            const params = new URLSearchParams();

            // Pagination
            params.append("page", (state.pagination.pageIndex + 1).toString());
            params.append("limit", state.pagination.pageSize.toString());

            // Sorting - Use server-side sorting parameters from API docs
            if (state.sorting.length > 0) {
                const sort = state.sorting[0];
                params.append("sortBy", sort.id);
                params.append("sortOrder", sort.desc ? "desc" : "asc");
            }

            // Filters - Handle different filter types according to API docs
            state.columnFilters.forEach((filter) => {
                if (filter.value !== undefined && filter.value !== null) {
                    const queryParam = mapColumnToQueryParam(filter.id);

                    if (Array.isArray(filter.value)) {
                        // Handle array filters (like faceted filters)
                        filter.value.forEach((val) => {
                            if (
                                val !== undefined &&
                                val !== null &&
                                val !== ""
                            ) {
                                params.append(queryParam, val.toString());
                            }
                        });
                    } else if (filter.value !== "") {
                        // Handle single value filters
                        if (filter.id === "carat") {
                            // Handle carat range filters
                            if (
                                typeof filter.value === "object" &&
                                filter.value.min !== undefined
                            ) {
                                params.append(
                                    "caratMin",
                                    filter.value.min.toString()
                                );
                            }
                            if (
                                typeof filter.value === "object" &&
                                filter.value.max !== undefined
                            ) {
                                params.append(
                                    "caratMax",
                                    filter.value.max.toString()
                                );
                            }
                        } else if (filter.id === "stockId") {
                            // Use searchTerm for stock ID search as per API docs
                            params.append(
                                "searchTerm",
                                filter.value.toString()
                            );
                        } else {
                            params.append(queryParam, filter.value.toString());
                        }
                    }
                }
            });

            return params;
        },
        [mapColumnToQueryParam]
    );

    // FIXED: Stabilize fetchGems function
    const fetchGems = useCallback(
        async (state: TableState) => {
            try {
                setLoading(true);
                setError(null);

                const queryParams = buildQueryParams(state);

                // Determine if we need search endpoint based on filters
                const hasSearchFilters = state.columnFilters.some(
                    (filter) =>
                        filter.value !== undefined &&
                        filter.value !== null &&
                        filter.value !== "" &&
                        (Array.isArray(filter.value)
                            ? filter.value.length > 0
                            : true)
                );

                // Use search endpoint for any filtering, regular endpoint for just pagination/sorting
                const endpoint = hasSearchFilters
                    ? "/api/gems/search"
                    : "/api/gems";

                console.log(`🔍 Fetching gems from: ${endpoint}`, {
                    page: state.pagination.pageIndex + 1,
                    limit: state.pagination.pageSize,
                    filters: state.columnFilters.length,
                    sorting: state.sorting.length,
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

                // Handle pagination metadata from API response
                const totalRecords =
                    responseData.totalRecords ||
                    responseData.totalFilteredRecords ||
                    responseData.pagination?.totalRecords ||
                    responseData.data.length;

                setTotalCount(totalRecords);

                if (responseData.pagination) {
                    setPaginationMeta(responseData.pagination);
                    setPageCount(responseData.pagination.totalPages);
                } else {
                    // Calculate pagination metadata
                    const calculatedPageCount = Math.ceil(
                        totalRecords / state.pagination.pageSize
                    );
                    setPageCount(calculatedPageCount);

                    setPaginationMeta({
                        currentPage: state.pagination.pageIndex + 1,
                        totalPages: calculatedPageCount,
                        totalRecords: totalRecords,
                        recordsPerPage: state.pagination.pageSize,
                        hasNextPage:
                            state.pagination.pageIndex + 1 <
                            calculatedPageCount,
                        hasPrevPage: state.pagination.pageIndex > 0,
                    });
                }

                console.log("✅ Gems fetched successfully:", {
                    count: responseData.data.length,
                    totalRecords: totalRecords,
                    appliedFilters: responseData.appliedFilters,
                });
            } catch (err) {
                console.error("❌ Error fetching gems:", err);
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
        [buildQueryParams] // Only buildQueryParams as dependency
    );

    // FIXED: Separate function to update table state without immediate fetch
    const updateTable = useCallback((newState: TableState) => {
        console.log("🔄 Updating table state:", newState);
        setTableState(newState);
    }, []);

    const refetch = useCallback(() => {
        console.log("🔄 Manual refetch requested");
        fetchGems(tableState);
    }, [fetchGems, tableState]);

    // Effect for initial load only
    useEffect(() => {
        if (isInitialLoad.current) {
            console.log("🚀 Initial gems load");
            fetchGems(tableState);
            isInitialLoad.current = false;
        }
    }, [fetchGems, tableState]); // Include fetchGems but it's stable now

    // FIXED: Effect for table state changes (after initial load)
    useEffect(() => {
        if (!isInitialLoad.current) {
            console.log(
                "📊 Table state changed, fetching gems data:",
                tableState
            );

            // Add a small delay to debounce rapid state changes
            const timeoutId = setTimeout(() => {
                fetchGems(tableState);
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [tableState]); // Remove fetchGems from dependencies to prevent infinite loop

    return {
        gems,
        loading,
        error,
        totalCount,
        pageCount,
        refetch,
        updateTable,
        paginationMeta,
    };
}
