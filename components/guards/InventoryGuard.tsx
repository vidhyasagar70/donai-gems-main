"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield } from "lucide-react";

interface InventoryGuardProps {
    children: React.ReactNode;
}

export function InventoryGuard({ children }: InventoryGuardProps) {
    const { user, isAuthenticated, loading, isAdmin, hasStatus } = useAuth();
    const router = useRouter();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        if (loading) return;

        // Check if user is authenticated
        if (!isAuthenticated) {
            setShowWarning(true);
            return;
        }

        // Check access permissions:
        // 1. ADMIN can access regardless of status
        // 2. USER must have ACTIVE or APPROVED status
        const hasAccess =
            isAdmin ||
            (user?.role === "USER" &&
                (hasStatus("ACTIVE") || hasStatus("APPROVED")));

        if (!hasAccess) {
            // If USER but not ACTIVE or APPROVED, redirect to account status page
            if (
                user?.role === "USER" &&
                !hasStatus("ACTIVE") &&
                !hasStatus("APPROVED")
            ) {
                router.push("/account-suspended");
                return;
            }
        }

        setShowWarning(false);
    }, [loading, isAuthenticated, isAdmin, user, hasStatus, router]);

    // Skeleton grid component
    const renderSkeletonGrid = () => (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header skeleton */}
                <div className="space-y-4">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/6"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/8"></div>
                    </div>
                </div>

                {/* Grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden p-0 rounded-none border-primary/50"
                        >
                            <CardContent className="p-0">
                                <div className="aspect-square bg-gray-200 animate-pulse relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination skeleton */}
                <div className="flex items-center justify-center gap-2 py-4">
                    <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Show warning for unauthenticated users with skeleton background
    if (showWarning && !isAuthenticated) {
        return (
            <div className="relative">
                {/* Background skeleton grid */}
                {renderSkeletonGrid()}

                {/* Overlay with alert dialog */}
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
                        <Alert variant="destructive" className="mb-6">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="font-medium">
                                Authentication Required
                            </AlertDescription>
                        </Alert>

                        <div className="text-center space-y-4">
                            <Shield className="h-16 w-16 text-gray-400 mx-auto" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    Login Required
                                </h2>
                                <p className="text-gray-600">
                                    To access the inventory, you must be logged
                                    in with an active account.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    onClick={() => router.push("/login")}
                                    className="w-full bg-primary hover:bg-primary/90"
                                >
                                    Login to Continue
                                </Button>
                                <Button
                                    onClick={() => router.push("/register")}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Create New Account
                                </Button>
                                <Button
                                    onClick={() => router.push("/")}
                                    variant="ghost"
                                    className="w-full"
                                >
                                    Back to Home
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Check access permissions after authentication
    const hasAccess =
        isAdmin ||
        (user?.role === "USER" &&
            (hasStatus("ACTIVE") || hasStatus("APPROVED")));

    if (!hasAccess) {
        // This case should be handled by the useEffect redirect, but as a fallback
        return null;
    }

    // All checks passed, render children
    return <>{children}</>;
}
