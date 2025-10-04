"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StepOne from "@/components/login/RegisterForm";
import StepTwo from "@/components/login/OtpForm";
import StepThree from "@/components/login/CustomerForm";
import StepFour from "@/components/login/SuccessfullRegistration";
import { authAPI } from "@/services/auth-api";

interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface OTPData {
    email: string;
    otp: string;
    userId: string;
}

interface CustomerData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    countryCode: string;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    businessInfo: {
        companyName: string;
        businessType: string;
        vatNumber: string;
        websiteUrl: string;
    };
}

const Page = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [submittedUserData, setSubmittedUserData] = useState<any>(null);

    // Form data states
    const [registerData, setRegisterData] = useState<RegisterData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otpData, setOtpData] = useState<OTPData>({
        email: "",
        otp: "",
        userId: "",
    });

    const [customerData, setCustomerData] = useState<CustomerData>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        countryCode: "+1",
        address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        },
        businessInfo: {
            companyName: "",
            businessType: "",
            vatNumber: "",
            websiteUrl: "",
        },
    });

    // Check if user should skip to customer data step
    useEffect(() => {
        const skipToCustomerData = sessionStorage.getItem("skipToCustomerData");
        const userData = sessionStorage.getItem("userData");

        if (skipToCustomerData === "true" && userData) {
            const parsedUserData = JSON.parse(userData);

            setRegisterData((prev) => ({
                ...prev,
                username: parsedUserData.username,
                email: parsedUserData.email,
            }));

            setOtpData((prev) => ({
                ...prev,
                email: parsedUserData.email,
                userId: parsedUserData.userId,
            }));

            setCurrentStep(3);

            sessionStorage.removeItem("skipToCustomerData");
            sessionStorage.removeItem("userData");
        }
    }, []);

    // Validation functions
    const validateRegisterStep = () => {
        if (!registerData.username.trim()) return "Username is required";
        if (!registerData.email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email))
            return "Please enter a valid email address";
        if (!registerData.password.trim()) return "Password is required";
        if (!registerData.confirmPassword.trim())
            return "Confirm password is required";
        if (registerData.password !== registerData.confirmPassword)
            return "Passwords do not match";
        if (registerData.password.length < 6)
            return "Password must be at least 6 characters";
        return null;
    };

    const validateOtpStep = () => {
        if (!otpData.otp.trim()) return "OTP is required";
        if (otpData.otp.length !== 4) return "OTP must be 4 digits";
        return null;
    };

    const validateCustomerStep = () => {
        if (!customerData.firstName.trim()) return "First Name is required";
        if (!customerData.lastName.trim()) return "Last Name is required";
        if (!customerData.phoneNumber.trim()) return "Phone Number is required";
        if (!customerData.countryCode.trim()) return "Country Code is required";
        if (!customerData.address.street.trim())
            return "Street address is required";
        if (!customerData.address.city.trim()) return "City is required";
        if (!customerData.address.state.trim()) return "State is required";
        if (!customerData.address.postalCode.trim())
            return "Postal Code is required";
        if (!customerData.address.country.trim()) return "Country is required";
        if (!customerData.businessInfo.companyName.trim())
            return "Company Name is required";
        if (!customerData.businessInfo.businessType.trim())
            return "Business Type is required";
        if (!customerData.businessInfo.vatNumber.trim())
            return "VAT Number is required";
        return null;
    };

    // API functions
    const handleRegisterUser = async (): Promise<boolean> => {
        setIsLoading(true);
        setError("");

        try {
            const response = await authAPI.register({
                username: registerData.username,
                email: registerData.email,
                password: registerData.password,
            });

            if (response.success) {
                // Set userId for OTP verification and email
                setOtpData((prev) => ({
                    ...prev,
                    email: registerData.email,
                    userId: response.userId,
                }));
                return true;
            } else {
                setError(response.message || "Registration failed");
                return false;
            }
        } catch (err: any) {
            console.error("Registration error:", err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 409) {
                setError("User already exists with this email or username");
            } else if (err.response?.status === 400) {
                setError(
                    err.response.data.error || "Invalid registration data"
                );
            } else {
                setError("Registration failed. Please try again.");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (): Promise<boolean> => {
        setIsLoading(true);
        setError("");

        try {
            const response = await authAPI.verifyOTP({
                email: otpData.email,
                otp: otpData.otp,
                userId: otpData.userId,
            });

            if (response.success) {
                return true;
            } else {
                setError(response.message || "OTP verification failed");
                return false;
            }
        } catch (err: any) {
            console.error("OTP verification error:", err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 400) {
                setError("Invalid or expired OTP");
            } else if (err.response?.status === 404) {
                setError("User not found");
            } else {
                setError("OTP verification failed. Please try again.");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitCustomerData = async (): Promise<boolean> => {
        setIsLoading(true);
        setError("");

        try {
            // Call the actual registerCustomer API endpoint
            const response = await authAPI.registerCustomer(customerData);

            if (response.success) {
                // Store user data for the success message
                setSubmittedUserData({
                    username: registerData.username,
                    email: registerData.email,
                    firstName: customerData.firstName,
                    lastName: customerData.lastName,
                    companyName: customerData.businessInfo.companyName,
                });

                return true;
            } else {
                setError(response.message || "Customer data submission failed");
                return false;
            }
        } catch (err: any) {
            console.error("Customer data submission error:", err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 400) {
                setError("Invalid customer data provided");
            } else if (err.response?.status === 409) {
                setError("Customer data already exists");
            } else {
                setError("Customer data submission failed. Please try again.");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = async () => {
        setError("");

        if (currentStep === 1) {
            const validationError = validateRegisterStep();
            if (validationError) {
                setError(validationError);
                return;
            }

            const registrationSuccessful = await handleRegisterUser();
            if (registrationSuccessful) {
                setCurrentStep(2);
            }
        } else if (currentStep === 2) {
            const validationError = validateOtpStep();
            if (validationError) {
                setError(validationError);
                return;
            }

            const otpSuccessful = await handleVerifyOTP();
            if (otpSuccessful) {
                setCurrentStep(3);
            }
        }
    };

    const handleSubmit = async () => {
        setError("");
        const customerError = validateCustomerStep();
        if (customerError) {
            setError(customerError);
            return;
        }

        const submitSuccessful = await handleSubmitCustomerData();
        if (submitSuccessful) {
            setCurrentStep(4);
        }
    };

    const handleBack = () => {
        setError("");
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return "Create Account";
            case 2:
                return "Verify Email";
            case 3:
                return "Customer Details";
            case 4:
                return "Registration Complete";
            default:
                return "Register";
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <StepOne
                        registerData={registerData}
                        setRegisterData={setRegisterData}
                    />
                );
            case 2:
                return <StepTwo otpData={otpData} setOtpData={setOtpData} />;
            case 3:
                return (
                    <StepThree
                        customerData={customerData}
                        setCustomerData={setCustomerData}
                    />
                );
            case 4:
                return (
                    <StepFour
                        submittedUserData={submittedUserData}
                        onBackToLogin={() => router.push("/login")}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen  flex justify-center items-center bg-gray-50/10 py-12 px-4">
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
                        <h2
                            className={`text-5xl text-primary py-3 font-normal font-playfair`}
                        >
                            {getStepTitle()}
                        </h2>
                        {currentStep < 4 && (
                            <div className="flex items-center justify-center space-x-2">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className={`w-8 h-2 rounded-full ${
                                            currentStep >= step
                                                ? "bg-primary"
                                                : "bg-primary/30"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Step Content */}
                    {renderCurrentStep()}

                    {/* Error Message */}
                    {error && currentStep < 4 && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md w-full">
                            {error}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {currentStep < 4 && (
                        <div className="w-full space-y-3">
                            <button
                                onClick={
                                    currentStep < 3 ? handleNext : handleSubmit
                                }
                                disabled={isLoading}
                                className={`w-full py-3 text-white bg-primary/80 rounded-full font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-openSans`}
                            >
                                {isLoading
                                    ? currentStep === 1
                                        ? "Creating Account..."
                                        : currentStep === 2
                                        ? "Verifying..."
                                        : "Submitting..."
                                    : currentStep === 1
                                    ? "Next"
                                    : currentStep === 2
                                    ? "Verify"
                                    : "Complete Registration"}
                            </button>

                            {currentStep > 1 && (
                                <button
                                    onClick={handleBack}
                                    disabled={isLoading}
                                    className={`w-full py-3 border-primary/30 text-secondary hover:bg-primary/10 rounded-full font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border font-openSans`}
                                >
                                    Back
                                </button>
                            )}
                        </div>
                    )}

                    {/* Login Link */}
                    {currentStep < 4 && (
                        <div className={`text-center font-openSans`}>
                            <span className="text-gray-600">
                                Already have an account?{" "}
                            </span>
                            <button
                                onClick={() => router.push("/login")}
                                type="button"
                                className="text-[#C49A6C] font-medium hover:text-[#8B6F4D] transition-colors bg-transparent border-none cursor-pointer underline"
                            >
                                Log in
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
