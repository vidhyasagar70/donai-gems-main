"use client";
import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import { User } from "@/lib/validations/user-schema";
import { authAPI } from "@/services/auth-api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isApprovedUser: boolean;
    hasStatus: (
        status: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED" | "APPROVED"
    ) => boolean;
    hasRole: (role: "USER" | "ADMIN") => boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isRefreshing: boolean;
    login: (userData: User) => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const loadUserFromStorage = useCallback(() => {
        setLoading(true);
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (err) {
            console.error("Failed to load user from storage", err);
            setUser(null);
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchUserProfile = useCallback(
        async (isManualRefresh = false) => {
            if (isManualRefresh) {
                setIsRefreshing(true);
            } else {
                setLoading(true);
            }

            setError(null);

            // Keeping track of current user for fallback
            const currentUser = user;

            try {
                const response = await authAPI.getProfile();
                console.log("Fetched user profile:", response);
                if (response.success && response.data.user) {
                    setUser(response.data.user);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );
                } else {
                    throw new Error(
                        response.message || "Failed to fetch user profile"
                    );
                }
            } catch (err: any) {
                console.error("Profile fetch error:", err);

                // Only clear user if this is NOT a manual refresh
                // For manual refresh, keep the existing user data
                if (!isManualRefresh) {
                    setUser(null);
                    localStorage.removeItem("user");
                } else {
                    // For manual refresh, restore the previous user and just show error
                    setUser(currentUser);
                }

                setError(err.message || "Could not refresh user session.");
            } finally {
                if (isManualRefresh) {
                    setIsRefreshing(false);
                } else {
                    setLoading(false);
                }
            }
        },
        [user]
    );

    const refreshUser = useCallback(async () => {
        await fetchUserProfile(true);
    }, [fetchUserProfile]);

    useEffect(() => {
        loadUserFromStorage();
    }, [loadUserFromStorage]);

    const logout = async () => {
        setLoading(true);
        try {
            await authAPI.logout();
            Cookies.remove("accessToken");
            sessionStorage.clear();
        } catch (err) {
            console.error("Logout failed, clearing session locally.", err);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("authToken");
            sessionStorage.clear();
            setLoading(false);
            router.push("/");
        }
    };

    const authState = useMemo(() => {
        const isAuthenticated = !!user;
        const isAdmin = user?.role === "ADMIN";
        const isApprovedUser =
            user?.status === "ACTIVE" || user?.status === "APPROVED";

        const hasStatus = (
            status: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED" | "APPROVED"
        ) => user?.status === status;
        const hasRole = (role: "USER" | "ADMIN") => user?.role === role;

        return {
            user,
            loading,
            error,
            isAuthenticated,
            isAdmin,
            isApprovedUser,
            hasStatus,
            hasRole,
            logout,
            refreshUser,
            isRefreshing,
            login,
        };
    }, [user, loading, error, refreshUser, isRefreshing]);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};
