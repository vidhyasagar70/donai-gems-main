import React from "react";
import Link from "next/link";

interface StepFourProps {
    submittedUserData: any;
    onBackToLogin: () => void;
}

const StepFour: React.FC<StepFourProps> = ({
    submittedUserData,
    onBackToLogin,
}) => {
    return (
        <div className="w-full space-y-6 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            {/* Success Title */}
            <div className="space-y-2">
                <h3
                    className={`text-2xl font-bold text-gray-900 font-openSans`}
                >
                    Registration Submitted Successfully!
                </h3>
                <p className={`text-gray-600 font-openSans`}>
                    Thank you for completing your registration,{" "}
                    {submittedUserData?.firstName}!
                </p>
            </div>

            {/* Success Message */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left">
                <div className="space-y-3">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h4
                                className={`text-sm font-medium text-blue-800 font-openSans`}
                            >
                                What happens next?
                            </h4>
                            <div
                                className={`mt-2 text-sm text-blue-700 font-openSans`}
                            >
                                <ul className="space-y-2">
                                    <li>
                                        • Your KYC information has been
                                        submitted for admin review
                                    </li>
                                    <li>
                                        • You will receive an email notification
                                        once your account is approved
                                    </li>
                                    <li>
                                        • This process typically takes 24-48
                                        hours
                                    </li>
                                    <li>
                                        • Once approved, you can log in and
                                        access the diamond inventory
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Details Summary */}
            <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4
                    className={`text-sm font-medium text-gray-900 mb-3 font-openSans`}
                >
                    Registration Summary:
                </h4>
                <div
                    className={`space-y-2 text-sm text-gray-600 font-openSans`}
                >
                    <div className="flex justify-between">
                        <span>Username:</span>
                        <span className="font-medium">
                            {submittedUserData?.username}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">
                            {submittedUserData?.email}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-medium">
                            {submittedUserData?.firstName}{" "}
                            {submittedUserData?.lastName}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Company:</span>
                        <span className="font-medium">
                            {submittedUserData?.companyName}
                        </span>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className={`text-sm text-gray-500 font-openSans`}>
                <p>
                    If you have any questions, please contact our support team
                    at{" "}
                    <Link
                        href="/contact"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        support@donaigems.com
                    </Link>
                </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={onBackToLogin}
                    className={`w-full py-3 text-white bg-primary/80 rounded-full font-medium text-base transition-all duration-300 font-openSans`}
                >
                    Continue to Login
                </button>
            </div>
        </div>
    );
};

export default StepFour;
