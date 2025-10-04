"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";
import {
    User,
    Mail,
    Phone,
    Building,
    MapPin,
    RefreshCw,
    Shield,
    Calendar,
    AlertCircle,
    Edit3,
    X,
    Lock,
    Loader2,
    Send,
    CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { authAPI } from "@/services/auth-api";
import { Input } from "@/components/ui/input";
import { ResetPasswordModal } from "@/components/modals/ResetPasswordModal";

export default function ProfilePage() {
    const {
        user,
        loading,
        error,
        refreshUser,
        isAdmin,
        isApprovedUser,
        isRefreshing,
    } = useAuth();
    const router = useRouter();

    // Modal States
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // Email Change States
    const [newEmail, setNewEmail] = useState("");
    const [emailOtp, setEmailOtp] = useState("");
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [emailChangeLoading, setEmailChangeLoading] = useState(false);
    const [emailChangeError, setEmailChangeError] = useState<string | null>(
        null
    );
    const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);

    // Password Change States - These can be removed or simplified
    // const [newPassword, setNewPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [passwordOtp, setPasswordOtp] = useState("");
    // const [passwordOtpSent, setPasswordOtpSent] = useState(false);
    // const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
    // const [passwordChangeError, setPasswordChangeError] = useState<
    //     string | null
    // >(null);
    // const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

    if (loading) {
        return (
            <Container className="min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <div className="text-lg text-gray-600">
                            Loading profile...
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    if (error && !user) {
        return (
            <Container className="min-h-screen">
                <div className="max-w-2xl mx-auto py-8">
                    <Alert variant="destructive">
                        <AlertDescription>
                            {error}
                            <Button
                                onClick={refreshUser}
                                variant="outline"
                                size="sm"
                                className="ml-4"
                                disabled={isRefreshing}
                            >
                                {isRefreshing ? "Refreshing..." : "Try Again"}
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className="min-h-screen">
                <div className="max-w-2xl mx-auto py-8 text-center">
                    <div className="text-gray-500">No user data available</div>
                </div>
            </Container>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleCompleteProfile = () => {
        // Store current user data in sessionStorage to skip the initial registration steps
        sessionStorage.setItem("skipToCustomerData", "true");
        sessionStorage.setItem(
            "userData",
            JSON.stringify({
                username: user.username,
                email: user.email,
                userId: user._id,
            })
        );
        router.push("/register");
    };

    // --- Modal Close Handlers ---
    const handleCloseEmailModal = () => {
        setIsEmailModalOpen(false);
        setNewEmail("");
        setEmailOtp("");
        setEmailOtpSent(false);
        setEmailChangeLoading(false);
        setEmailChangeError(null);
        setEmailChangeSuccess(false);
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
        // No longer need to reset password state here
    };

    // --- Email Change Logic ---
    const handleSendEmailOtp = async () => {
        if (!newEmail || !newEmail.includes("@")) {
            setEmailChangeError("Please enter a valid email address.");
            return;
        }
        if (newEmail === user.email) {
            setEmailChangeError(
                "New email cannot be the same as the current one."
            );
            return;
        }

        setEmailChangeLoading(true);
        setEmailChangeError(null);
        try {
            await authAPI.sendOtpForEmail(newEmail);
            setEmailOtpSent(true);
        } catch (err: any) {
            setEmailChangeError(
                err.response?.data?.error || "Failed to send OTP."
            );
        } finally {
            setEmailChangeLoading(false);
        }
    };

    const handleUpdateEmail = async () => {
        if (!emailOtp || emailOtp.length < 4) {
            setEmailChangeError("Please enter a valid OTP.");
            return;
        }
        setEmailChangeLoading(true);
        setEmailChangeError(null);
        try {
            const response = await authAPI.updateEmail(newEmail, emailOtp);
            console.error(response);
            setEmailChangeSuccess(true);
            refreshUser(); // Refresh user data to get the new email
            setTimeout(handleCloseEmailModal, 2000);
        } catch (err: any) {
            setEmailChangeError(
                err.response?.data?.error || "Failed to update email."
            );
        } finally {
            setEmailChangeLoading(false);
        }
    };

    return (
        <Container className="min-h-screen">
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Profile
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage your account information and preferences
                        </p>
                    </div>
                    <Button
                        onClick={refreshUser}
                        variant="outline"
                        className="flex items-center space-x-2"
                        disabled={isRefreshing}
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${
                                isRefreshing ? "animate-spin" : ""
                            }`}
                        />
                        <span>
                            {isRefreshing ? "Refreshing..." : "Refresh"}
                        </span>
                    </Button>
                </div>

                {/* Show refresh error without disrupting the page */}
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Incomplete Profile Alert */}
                {!user.customerData && !isAdmin && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                            <span>
                                Your profile is incomplete. Please complete your
                                customer information to access all features.
                            </span>
                            <Button
                                onClick={handleCompleteProfile}
                                size="sm"
                                className="ml-4"
                            >
                                Complete Profile
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Basic Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Basic Information</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Username
                                </label>
                                <div className="mt-1 text-lg font-medium">
                                    {user.username}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Email
                                </label>
                                <div className="mt-1 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span>{user.email}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() =>
                                            setIsEmailModalOpen(true)
                                        }
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            {user.phone && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Phone
                                    </label>
                                    <div className="mt-1 flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Password
                                </label>
                                <div className="mt-1 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Lock className="h-4 w-4 text-gray-400" />
                                        <span>••••••••</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() =>
                                            setIsPasswordModalOpen(true)
                                        }
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Member Since
                                </label>
                                <div className="mt-1 flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span>
                                        {formatDate(user.createdAt as string)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Shield className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                    Role:
                                </span>
                                <Badge
                                    variant={
                                        isAdmin ? "destructive" : "outline"
                                    }
                                    className="text-xs"
                                >
                                    {user.role}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">
                                    Status:
                                </span>
                                <Badge
                                    variant={
                                        isApprovedUser ? "default" : "outline"
                                    }
                                    className="text-xs"
                                >
                                    {user.status}
                                </Badge>
                            </div>
                            {user.isVip && (
                                <Badge
                                    variant="default"
                                    className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600"
                                >
                                    VIP Member
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Customer Information Card */}
                {user.customerData && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Building className="h-5 w-5" />
                                <span>Customer Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        First Name
                                    </label>
                                    <div className="mt-1 text-lg">
                                        {user.customerData.firstName}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Last Name
                                    </label>
                                    <div className="mt-1 text-lg">
                                        {user.customerData.lastName}
                                    </div>
                                </div>
                                {user.customerData.phoneNumber && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            Phone Number
                                        </label>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span>
                                                {user.customerData.phoneNumber}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {user.customerData && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            Date of Birth
                                        </label>
                                        <div className="mt-1">
                                            {
                                                user.customerData.businessInfo
                                                    .businessType
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Address Information */}
                            {user.customerData.address && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="flex items-center space-x-2 text-lg font-medium mb-4">
                                            <MapPin className="h-5 w-5" />
                                            <span>Address</span>
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Street
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.street
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    City
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.city
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    State/Province
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.state
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Postal Code
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.postalCode
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Country
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .address.country
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Business Information */}
                            {user.customerData.businessInfo && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="flex items-center space-x-2 text-lg font-medium mb-4">
                                            <Building className="h-5 w-5" />
                                            <span>Business Information</span>
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Company Name
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .businessInfo
                                                            .companyName
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Business Type
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .businessInfo
                                                            .businessType
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    VAT Number
                                                </label>
                                                <div className="mt-1">
                                                    {
                                                        user.customerData
                                                            .businessInfo
                                                            .vatNumber
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Action Buttons */}
                {/* <div className="flex space-x-4">
                    <Button variant="outline" size="lg">
                        Edit Profile
                    </Button>
                    <Button variant="outline" size="lg">
                        Change Password
                    </Button>
                </div> */}
            </div>

            {/* Email Change Modal */}
            {isEmailModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 m-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                                Change Email
                            </h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCloseEmailModal}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        {emailChangeSuccess ? (
                            <div className="text-center py-4">
                                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                <h4 className="font-semibold">
                                    Email Updated!
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Your email has been changed to {newEmail}.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {!emailOtpSent ? (
                                    <div>
                                        <label
                                            htmlFor="new-email"
                                            className="text-sm font-medium"
                                        >
                                            New Email Address
                                        </label>
                                        <Input
                                            id="new-email"
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) =>
                                                setNewEmail(e.target.value)
                                            }
                                            placeholder="Enter your new email"
                                            className="mt-1"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label
                                            htmlFor="email-otp"
                                            className="text-sm font-medium"
                                        >
                                            OTP
                                        </label>
                                        <Input
                                            id="email-otp"
                                            value={emailOtp}
                                            onChange={(e) =>
                                                setEmailOtp(e.target.value)
                                            }
                                            placeholder="Enter OTP sent to new email"
                                            maxLength={6}
                                            className="mt-1"
                                        />
                                    </div>
                                )}
                                {emailChangeError && (
                                    <p className="text-sm text-red-600">
                                        {emailChangeError}
                                    </p>
                                )}
                                <div className="flex justify-end space-x-2 pt-2">
                                    <Button
                                        variant="outline"
                                        onClick={handleCloseEmailModal}
                                        disabled={emailChangeLoading}
                                    >
                                        Cancel
                                    </Button>
                                    {!emailOtpSent ? (
                                        <Button
                                            onClick={handleSendEmailOtp}
                                            disabled={
                                                emailChangeLoading || !newEmail
                                            }
                                        >
                                            {emailChangeLoading && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Send OTP
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleUpdateEmail}
                                            disabled={
                                                emailChangeLoading || !emailOtp
                                            }
                                        >
                                            {emailChangeLoading && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Update Email
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Password Change Modal */}
            <ResetPasswordModal
                isOpen={isPasswordModalOpen}
                onClose={handleClosePasswordModal}
                initialEmail={user?.email}
            />
        </Container>
    );
}
