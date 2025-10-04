"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, UserX, Clock } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireRole?: "USER" | "ADMIN";
    requireStatus?:
        | "PENDING"
        | "ACTIVE"
        | "SUSPENDED"
        | "REJECTED"
        | "APPROVED";
    redirectTo?: string;
}

export function AuthGuard({
    children,
    requireAuth = false,
    requireRole,
    requireStatus,
    redirectTo = "/login",
}: AuthGuardProps) {
    const { user, isAuthenticated, loading, isAdmin, hasRole, hasStatus } =
        useAuth();
    const router = useRouter();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        if (loading) return;

        // Check authentication requirement
        if (requireAuth && !isAuthenticated) {
            setShowWarning(true);
            return;
        }

        // Check role requirement
        if (requireRole && !hasRole(requireRole)) {
            router.push("/unauthorized");
            return;
        }

        // Check status requirement
        if (requireStatus && !hasStatus(requireStatus)) {
            router.push("/account-suspended");
            return;
        }

        setShowWarning(false);
    }, [
        loading,
        isAuthenticated,
        requireAuth,
        requireRole,
        requireStatus,
        hasRole,
        hasStatus,
        router,
    ]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Show warning for unauthenticated users trying to access protected routes
    if (showWarning && requireAuth && !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
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
                                Access Restricted
                            </h2>
                            <p className="text-gray-600">
                                To access the inventory, you must be logged in
                                with an active account.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => router.push("/login")}
                                className="w-full"
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
        );
    }

    // Show unauthorized access message
    if (requireRole && user && !hasRole(requireRole)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                    <Alert variant="destructive" className="mb-6">
                        <UserX className="h-4 w-4" />
                        <AlertDescription className="font-medium">
                            Insufficient Permissions
                        </AlertDescription>
                    </Alert>

                    <div className="text-center space-y-4">
                        <UserX className="h-16 w-16 text-red-400 mx-auto" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Access Denied
                            </h2>
                            <p className="text-gray-600">
                                You don't have the required permissions to
                                access this area.
                                {requireRole === "ADMIN" &&
                                    " Admin access is required."}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() =>
                                    router.push(
                                        isAdmin ? "/admin" : "/inventory"
                                    )
                                }
                                className="w-full"
                            >
                                Go to {isAdmin ? "Admin" : "Inventory"}
                            </Button>
                            <Button
                                onClick={() => router.push("/")}
                                variant="outline"
                                className="w-full"
                            >
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show account status warning
    if (requireStatus && user && !hasStatus(requireStatus)) {
        const getStatusMessage = () => {
            if (user.status === "PENDING") {
                return {
                    title: "Account Pending Approval",
                    message:
                        "Your account is currently pending approval. Please wait for admin approval or contact support.",
                    icon: (
                        <Clock className="h-16 w-16 text-yellow-400 mx-auto" />
                    ),
                };
            }
            if (user.status === "SUSPENDED") {
                return {
                    title: "Account Suspended",
                    message:
                        "Your account has been suspended. Please contact support for assistance.",
                    icon: <UserX className="h-16 w-16 text-red-400 mx-auto" />,
                };
            }
            return {
                title: "Account Status Issue",
                message:
                    "There's an issue with your account status. Please contact support.",
                icon: (
                    <AlertTriangle className="h-16 w-16 text-red-400 mx-auto" />
                ),
            };
        };

        const statusInfo = getStatusMessage();

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="font-medium">
                            Account Status: {user.status}
                        </AlertDescription>
                    </Alert>

                    <div className="text-center space-y-4">
                        {statusInfo.icon}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {statusInfo.title}
                            </h2>
                            <p className="text-gray-600">
                                {statusInfo.message}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => router.push("/contact")}
                                className="w-full"
                            >
                                Contact Support
                            </Button>
                            <Button
                                onClick={() => router.push("/")}
                                variant="outline"
                                className="w-full"
                            >
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // All checks passed, render children
    return <>{children}</>;
}
