"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authAPI } from "@/services/auth-api";
import { CheckCircle, Loader2, X } from "lucide-react";

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialEmail?: string;
}

export function ResetPasswordModal({
    isOpen,
    onClose,
    initialEmail = "",
}: ResetPasswordModalProps) {
    const [email, setEmail] = useState(initialEmail);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("email"); // 'email', 'otp', 'success'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendOtp = async () => {
        if (!email || !email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await authAPI.sendOtpForPassword(email);
            setStep("otp");
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!otp || otp.length < 4) {
            setError("Please enter a valid OTP.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await authAPI.updatePassword(email, newPassword, otp);
            setStep("success");
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to update password."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        // Reset state before closing
        setEmail(initialEmail);
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
        setStep(initialEmail ? "otp" : "email");
        setLoading(false);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 m-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                        {step === "success"
                            ? "Password Updated"
                            : "Reset Password"}
                    </h3>
                    <Button variant="ghost" size="icon" onClick={handleClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {step === "success" ? (
                    <div className="text-center py-4">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h4 className="font-semibold">Password Updated!</h4>
                        <p className="text-sm text-gray-600">
                            You can now use your new password to log in.
                        </p>
                        <div className="mt-6">
                            <Button onClick={handleClose}>Close</Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {step === "email" && (
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="mt-1"
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {step === "otp" && (
                            <>
                                <div>
                                    <label
                                        htmlFor="new-password"
                                        className="text-sm font-medium"
                                    >
                                        New Password
                                    </label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        placeholder="Enter new password"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="text-sm font-medium"
                                    >
                                        Confirm New Password
                                    </label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder="Confirm new password"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password-otp"
                                        className="text-sm font-medium"
                                    >
                                        OTP
                                    </label>
                                    <Input
                                        id="password-otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder={`Enter OTP sent to ${email}`}
                                        maxLength={6}
                                        className="mt-1"
                                    />
                                </div>
                            </>
                        )}

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        <div className="flex justify-end space-x-2 pt-2">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            {step === "email" ? (
                                <Button
                                    onClick={handleSendOtp}
                                    disabled={loading || !email}
                                >
                                    {loading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Send OTP
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleUpdatePassword}
                                    disabled={
                                        loading ||
                                        !otp ||
                                        !newPassword ||
                                        newPassword !== confirmPassword
                                    }
                                >
                                    {loading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Update Password
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
