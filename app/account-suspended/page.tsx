"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserX, Mail, Home } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AccountSuspendedPage() {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <UserX className="h-20 w-20 text-red-400 mx-auto mb-6" />

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Account{" "}
                    {user?.status === "PENDING" ? "Pending" : "Suspended"}
                </h1>

                {user?.status === "PENDING" ? (
                    <div className="space-y-4">
                        <Alert className="text-left">
                            <AlertDescription>
                                Your account is currently pending approval. Our
                                admin team will review your application and
                                notify you via email once approved.
                            </AlertDescription>
                        </Alert>

                        <p className="text-gray-600">
                            This process typically takes 24-48 hours. Thank you
                            for your patience.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Alert variant="destructive" className="text-left">
                            <AlertDescription>
                                Your account has been suspended. Please contact
                                our support team for assistance and more
                                information.
                            </AlertDescription>
                        </Alert>

                        <p className="text-gray-600">
                            If you believe this is an error, please reach out to
                            us immediately.
                        </p>
                    </div>
                )}

                <div className="space-y-3 mt-8">
                    <Button
                        onClick={() => router.push("/contact")}
                        className="w-full flex items-center gap-2"
                    >
                        <Mail className="h-4 w-4" />
                        Contact Support
                    </Button>

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
