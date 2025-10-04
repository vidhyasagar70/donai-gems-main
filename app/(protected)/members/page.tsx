"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Check,
    X,
    RefreshCw,
    Eye,
    Mail,
    Phone,
    Calendar,
    Clock,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Container from "@/components/ui/container";
import { AdminGuard } from "@/components/guards/AdminGuard";
import apiClient from "@/services/axios";
import { User } from "@/lib/validations/user-schema";

type TabType = "pending" | "approved" | "suspended";
// Note: API uses APPROVED instead of ACTIVE, and doesn't have SUSPENDED
type ApiUserStatus = "PENDING" | "APPROVED" | "SUSPENDED" | "REJECTED";

interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface UsersResponse {
    success: boolean;
    message: string;
    data: User[];
    pagination: PaginationMeta;
}

export default function MembersPage() {
    const [activeTab, setActiveTab] = useState<TabType>("pending");
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch all users at once
    const fetchAllUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch all users without status filter
            const response = await apiClient.get<UsersResponse>("/api/users", {
                params: {
                    limit: 100, // Get a large number to fetch all users
                    page: 1,
                },
            });

            if (response.data.success) {
                console.log("Fetched users response:", response.data);
                // Filter out ADMIN users - only show USER role users
                const userRoleOnly = response.data.data.filter(
                    (user) => user.role === "USER"
                );
                setAllUsers(userRoleOnly);
                console.log("Fetched all users:", userRoleOnly);
            } else {
                throw new Error(
                    response.data.message || "Failed to fetch users"
                );
            }
        } catch (err: any) {
            console.error("Error fetching users:", err);
            setError(err.message || "Failed to load users data");
        } finally {
            setLoading(false);
        }
    }, []);

    // Filter users by status on the frontend
    const getFilteredUsers = useCallback(() => {
        const pending = allUsers.filter(
            (user) => user.status === "PENDING" && user.customerData != null
        );
        const approved = allUsers.filter((user) => user.status === "APPROVED");
        const suspended = allUsers.filter(
            (user) => user.status === "SUSPENDED" || user.status === "REJECTED"
        );

        return {
            pending,
            approved,
            suspended,
        };
    }, [allUsers]);

    // Update user status (approve/reject functionality)
    const updateUserStatus = async (
        userId: string,
        newStatus: "APPROVED" | "SUSPENDED" | "REJECTED"
    ) => {
        setActionLoading(userId);
        try {
            // Note: Based on your APIs.md, there's no direct user status update endpoint
            // You might need to create one or use a different approach
            const response = await apiClient.put(`/api/users/${userId}`, {
                status: newStatus,
            });

            if (response.data.success) {
                // Update the user in the local state instead of refetching all data
                setAllUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userId
                            ? { ...user, status: newStatus }
                            : user
                    )
                );

                // Show success message based on action
                const actionText =
                    newStatus === "APPROVED" ? "approved" : "suspended";
                console.log(`User ${actionText} successfully`);
            } else {
                throw new Error(
                    response.data.message ||
                        `Failed to ${newStatus.toLowerCase()} user`
                );
            }
        } catch (err: any) {
            console.error(`Error updating user status:`, err);
            setError(err.message || `Failed to update user status`);
        } finally {
            setActionLoading(null);
        }
    };

    // Handle approve user
    const handleApproveUser = (userId: string) => {
        updateUserStatus(userId, "APPROVED");
    };

    // Handle reject/suspend user
    const handleRejectUser = (userId: string) => {
        updateUserStatus(userId, "REJECTED");
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Get current users based on active tab
    const getCurrentUsers = () => {
        const filteredUsers = getFilteredUsers();
        return filteredUsers[activeTab] || [];
    };

    // Render user table rows
    const renderUserRows = (
        usersList: User[],
        showActions: boolean = false
    ) => {
        if (usersList.length === 0) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={showActions ? 8 : 7}
                        className="text-center py-12 text-gray-500"
                    >
                        <div className="flex flex-col items-center space-y-2">
                            <Eye className="h-8 w-8 text-gray-300" />
                            <span>No users found</span>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        return usersList.map((user, index) => (
            <TableRow key={user._id} className="hover:bg-gray-50/50">
                <TableCell className="text-center font-medium">
                    {index + 1}
                </TableCell>
                <TableCell className="text-center">
                    <div className="space-y-1">
                        <div className="font-medium">{user.username}</div>
                        <Badge
                            variant={user.isVip ? "default" : "default"}
                            className="text-xs"
                        >
                            {user.isVip ? "VIP" : "Regular"}
                        </Badge>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="truncate max-w-40" title={user.email}>
                            {user.email}
                        </span>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    {user.customerData?.phoneNumber ? (
                        <div className="flex items-center justify-center space-x-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{user.customerData.phoneNumber}</span>
                        </div>
                    ) : (
                        <span className="text-gray-400">Not provided</span>
                    )}
                </TableCell>
                <TableCell className="text-center">
                    <Badge
                        variant={
                            user.role === "ADMIN" ? "destructive" : "outline"
                        }
                        className="text-xs"
                    >
                        {user.role}
                    </Badge>
                </TableCell>
                <TableCell className="text-center">
                    <Badge
                        variant={
                            user.status === "APPROVED"
                                ? "default"
                                : user.status === "PENDING"
                                ? "outline"
                                : "outline"
                        }
                        className="text-xs"
                    >
                        {user.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(user.createdAt as string)}</span>
                    </div>
                </TableCell>
                {showActions && (
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApproveUser(user._id!)}
                                disabled={actionLoading === user._id}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                            >
                                <Check className="h-3 w-3 mr-1" />
                                {actionLoading === user._id ? "..." : "Approve"}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectUser(user._id!)}
                                disabled={actionLoading === user._id}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            >
                                <X className="h-3 w-3 mr-1" />
                                {actionLoading === user._id ? "..." : "Suspend"}
                            </Button>
                        </div>
                    </TableCell>
                )}
            </TableRow>
        ));
    };

    // Load data on component mount
    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    // Get filtered users for stats
    const filteredUsers = getFilteredUsers();

    if (loading) {
        return (
            <AdminGuard>
                <Container className="min-h-screen">
                    <div className="flex items-center justify-center h-64">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            <div className="text-lg text-gray-600">
                                Loading members...
                            </div>
                        </div>
                    </div>
                </Container>
            </AdminGuard>
        );
    }

    return (
        <AdminGuard>
            <Container className="min-h-screen ">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Members Management
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Manage user accounts and their status (Admin
                                users excluded)
                            </p>
                        </div>
                        <Button
                            onClick={fetchAllUsers}
                            disabled={loading}
                            variant="outline"
                            className="flex items-center space-x-2"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${
                                    loading ? "animate-spin" : ""
                                }`}
                            />
                            <span>Refresh</span>
                        </Button>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {error}
                                <Button
                                    onClick={fetchAllUsers}
                                    variant="outline"
                                    size="sm"
                                    className="ml-4"
                                >
                                    Retry
                                </Button>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Stats Cards */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-yellow-100 p-2 rounded-full">
                                    <Clock className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-yellow-600">
                                        Pending Approval
                                    </div>
                                    <div className="text-2xl font-bold text-yellow-700">
                                        {filteredUsers.pending.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Check className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-green-600">
                                        Approved Members
                                    </div>
                                    <div className="text-2xl font-bold text-green-700">
                                        {filteredUsers.approved.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-red-100 p-2 rounded-full">
                                    <X className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-red-600">
                                        Suspended
                                    </div>
                                    <div className="text-2xl font-bold text-red-700">
                                        {filteredUsers.suspended.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Tabs */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                        <Button
                            variant={
                                activeTab === "pending" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => setActiveTab("pending")}
                            className={`${
                                activeTab === "pending"
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Pending Approval ({filteredUsers.pending.length})
                        </Button>
                        <Button
                            variant={
                                activeTab === "approved" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => setActiveTab("approved")}
                            className={`${
                                activeTab === "approved"
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Approved Members ({filteredUsers.approved.length})
                        </Button>
                        <Button
                            variant={
                                activeTab === "suspended" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => setActiveTab("suspended")}
                            className={`${
                                activeTab === "suspended"
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Suspended ({filteredUsers.suspended.length})
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-lg border bg-white shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="text-center font-semibold">
                                        Sr.
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Username
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Email
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Phone
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Role
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Joined
                                    </TableHead>
                                    {activeTab === "pending" && (
                                        <TableHead className="text-center font-semibold">
                                            Actions
                                        </TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {renderUserRows(
                                    getCurrentUsers(),
                                    activeTab === "pending"
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                        <div>
                            Showing {getCurrentUsers().length} {activeTab} users
                            {allUsers.length > 0 && (
                                <span className="ml-2 text-gray-500">
                                    (Total: {allUsers.length} non-admin users)
                                </span>
                            )}
                        </div>
                        <div className="text-xs text-gray-500">
                            Last updated: {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            </Container>
        </AdminGuard>
    );
}
