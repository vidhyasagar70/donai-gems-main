"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authAPI } from "@/services/auth-api";
import { useAuth } from "@/hooks/useAuth";
import { ResetPasswordModal } from "@/components/modals/ResetPasswordModal";

const Page = () => {
    const [emailFormData, setEmailFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [passkeyFormData, setPasskeyFormData] = useState({
        name: "",
        passkey: "",
        rememberMe: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
        useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setEmailFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePasskeyInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setPasskeyFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await authAPI.login({
                email: emailFormData.email,
                password: emailFormData.password,
            });

            if (response.success) {
                // Store user data
                login(response.data.user);

                // Redirect based on user role
                if (response.data.user.role === "ADMIN") {
                    router.push("/admin");
                } else {
                    router.push("/gemstones");
                }
            }
        } catch (err: any) {
            console.error("Login error:", err);

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (err.response?.status === 400) {
                setError("Invalid email or password");
            } else if (err.response?.status === 401) {
                setError(
                    "Account not verified. Please check your email for verification."
                );
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasskeySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Using the VIP login endpoint
            const response = await authAPI.vipLogin({
                name: "vipuser1",
                passkey: passkeyFormData.passkey,
            });

            if (response.success) {
                login(response.data.user);

                // Redirect VIP users
                router.push("/gemstones");
            } else {
                setError(response.message || "Passkey login failed");
            }
        } catch (err: any) {
            setError(
                err.response?.data?.error ||
                    "Passkey login failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen lg:-translate-y-20 flex justify-center items-center bg-gray-50/10 py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="flex flex-col items-center space-y-6 p-8">
                    {/* Logo and Header */}
                    <div className="text-center space-y-4">
                        {/* <div className="flex justify-center mb-6">
                            <Image
                                src="Donai.svg"
                                alt="Donai Gems"
                                width={120}
                                height={60}
                                className="object-contain"
                            />
                        </div> */}
                        <h2 className="text-5xl text-primary py-3 font-normal font-playfair">
                            Login
                        </h2>
                    </div>

                    {/* Tabs for Email and Passkey Login */}
                    <Tabs defaultValue="email" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger
                                value="email"
                                className="font-openSans"
                            >
                                Email Login
                            </TabsTrigger>
                            <TabsTrigger
                                value="passkey"
                                className="font-openSans"
                            >
                                Passkey Login
                            </TabsTrigger>
                        </TabsList>

                        {/* Email Login Tab */}
                        <TabsContent value="email" className="space-y-0">
                            <form
                                onSubmit={handleEmailSubmit}
                                className="w-full space-y-5"
                            >
                                {/* Email Field */}
                                <div className="space-y-4">
                                    <label
                                        htmlFor="email"
                                        className="text-base font-medium text-secondary font-openSans"
                                    >
                                        Username or email address*
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your username or email"
                                        value={emailFormData.email}
                                        onChange={handleEmailInputChange}
                                        className="w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors font-openSans"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="text-base font-medium text-secondary font-openSans"
                                    >
                                        Password*
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={emailFormData.password}
                                        onChange={handleEmailInputChange}
                                        className="w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors font-openSans"
                                        required
                                    />
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            id="remember-email"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={emailFormData.rememberMe}
                                            onChange={handleEmailInputChange}
                                            className="w-4 h-4 rounded-full accent-[#C49A6C] text-black transition-colors cursor-pointer"
                                        />
                                        <label
                                            htmlFor="remember-email"
                                            className="text-sm text-secondary font-openSans"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsForgotPasswordModalOpen(true)
                                        }
                                        className="text-sm text-gray-500 hover:text-[#C49A6C] transition-colors font-openSans"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-6 text-white bg-primary/80 rounded-full font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-openSans"
                                >
                                    {isLoading ? "Logging in..." : "Log in"}
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Passkey Login Tab */}
                        <TabsContent value="passkey" className="space-y-0">
                            <form
                                onSubmit={handlePasskeySubmit}
                                className="w-full space-y-5"
                            >
                                {/* Username Field */}
                                <div className="space-y-4">
                                    {/* <label
                                        htmlFor="username"
                                        className="text-base font-medium text-secondary font-openSans"
                                    >
                                        Name*
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={passkeyFormData.name}
                                        onChange={handlePasskeyInputChange}
                                        className="w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors font-openSans"
                                        required
                                    /> */}
                                </div>

                                {/* Passkey Field */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="passkey"
                                        className="text-base font-medium text-secondary font-openSans"
                                    >
                                        Passkey*
                                    </label>
                                    <input
                                        id="passkey"
                                        name="passkey"
                                        type="password"
                                        placeholder="Enter your passkey"
                                        value={passkeyFormData.passkey}
                                        onChange={handlePasskeyInputChange}
                                        className="w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors font-openSans"
                                        required
                                    />
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            id="remember-passkey"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={passkeyFormData.rememberMe}
                                            onChange={handlePasskeyInputChange}
                                            className="w-4 h-4 rounded-full accent-[#C49A6C] text-black transition-colors cursor-pointer"
                                        />
                                        <label
                                            htmlFor="remember-passkey"
                                            className="text-sm text-secondary font-openSans"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-6 text-white bg-primary/80 rounded-full font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-openSans"
                                >
                                    {isLoading
                                        ? "Logging in..."
                                        : "Log in with Passkey"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md w-full">
                            {error}
                        </div>
                    )}

                    {/* Register Link */}
                    <div className="text-center font-openSans">
                        <span className="text-gray-600">
                            Don't have an account?{" "}
                        </span>
                        <button
                            onClick={() => router.push("/register")}
                            type="button"
                            className="text-[#C49A6C] font-medium hover:text-[#8B6F4D] transition-colors bg-transparent border-none cursor-pointer underline"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
            <ResetPasswordModal
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
            />
        </div>
    );
};

export default Page;
