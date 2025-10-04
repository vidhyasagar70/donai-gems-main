"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Shield, Home, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function UnauthorizedPage() {
    const router = useRouter();
    const { isAdmin, isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <Shield className="h-20 w-20 text-red-400 mx-auto mb-6" />

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Access Denied
                </h1>

                <p className="text-gray-600 mb-8">
                    You don't have the necessary permissions to access this
                    page. Admin privileges are required.
                </p>

                <div className="space-y-3">
                    {isAuthenticated && (
                        <Button
                            onClick={() =>
                                router.push(isAdmin ? "/admin" : "/inventory")
                            }
                            className="w-full flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go to {isAdmin ? "Admin Dashboard" : "Inventory"}
                        </Button>
                    )}

                    <Button
                        onClick={() => router.push("/")}
                        variant="outline"
                        className="w-full flex items-center gap-2"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
