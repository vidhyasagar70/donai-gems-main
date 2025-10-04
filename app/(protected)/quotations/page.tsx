"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { quotationAPI, AdminQuotation } from "@/services/quotation-api";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RefreshCw, Eye } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Container from "@/components/ui/container";
import { AdminGuard } from "@/components/guards/AdminGuard";

const QuotationsPageContent = () => {
    const { user, isAdmin, loading: authLoading } = useAuth();

    // Admin state
    const [adminQuotations, setAdminQuotations] = useState<AdminQuotation[]>(
        []
    );

    // Common state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQuotations = useCallback(async () => {
        if (!isAdmin) return;
        setLoading(true);
        setError(null);
        try {
            const response = await quotationAPI.getAllQuotations();
            console.log("Fetched quotations:", response);
            setAdminQuotations(response.data.users);
            console.log("Fetched quotations:", response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (!authLoading) {
            fetchQuotations();
        }
    }, [authLoading, fetchQuotations]);

    if (authLoading || loading) {
        return <div className="text-center p-12">Loading...</div>;
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Quotations</h1>
                <Button
                    onClick={fetchQuotations}
                    variant="outline"
                    disabled={loading}
                >
                    <RefreshCw
                        className={`mr-2 h-4 w-4 ${
                            loading ? "animate-spin" : ""
                        }`}
                    />
                    Refresh
                </Button>
            </div>

            <div className="rounded-lg border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Email</TableHead>
                            <TableHead>Total Quotations</TableHead>
                            <TableHead>Quotations</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {adminQuotations.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="text-center py-12 text-gray-500"
                                >
                                    <Eye className="mx-auto h-8 w-8 text-gray-300" />
                                    <span>No quotations found.</span>
                                </TableCell>
                            </TableRow>
                        ) : (
                            adminQuotations.map((user) => (
                                <TableRow key={user.userId}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.quotationCount}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            {user.quotations.map(
                                                (quotation, index) => (
                                                    <div
                                                        key={index}
                                                        className="text-sm bg-gray-50 p-2 rounded"
                                                    >
                                                        {quotation}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

const QuotationsPage = () => {
    return (
        <AdminGuard>
            <Container className="min-h-screen py-8">
                <QuotationsPageContent />
            </Container>
        </AdminGuard>
    );
};

export default QuotationsPage;
