import React from "react";

interface OTPData {
    email: string;
    otp: string;
    userId: string;
}

interface StepTwoProps {
    otpData: OTPData;
    setOtpData: React.Dispatch<React.SetStateAction<OTPData>>;
}

const StepTwo: React.FC<StepTwoProps> = ({ otpData, setOtpData }) => {
    const handleOtpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // Only allow 4 digits
        if (value.length <= 4 && /^\d*$/.test(value)) {
            setOtpData((prev) => ({
                ...prev,
                otp: value,
            }));
        }
    };

    return (
        <div className="w-full space-y-5">
            <div className="text-center space-y-2">
                <p className={`text-sm text-gray-600 font-openSans`}>
                    We've sent a 4-digit verification code to
                </p>
                <p
                    className={`text-sm font-medium text-gray-800 font-openSans`}
                >
                    {otpData.email}
                </p>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="otp"
                    className={`text-base font-medium text-secondary font-openSans`}
                >
                    Enter 4-digit OTP*
                </label>
                <input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otpData.otp}
                    onChange={handleOtpInputChange}
                    className={`w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-center text-2xl tracking-widest font-openSans`}
                    maxLength={4}
                    required
                />
            </div>

            <div className="text-center">
                <p className={`text-xs text-gray-500 font-openSans`}>
                    Didn't receive the code? Check your spam folder or try
                    again.
                </p>
            </div>
        </div>
    );
};

export default StepTwo;
