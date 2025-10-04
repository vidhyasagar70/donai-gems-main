import React from "react";

interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface StepOneProps {
    registerData: RegisterData;
    setRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>;
}

const StepOne: React.FC<StepOneProps> = ({ registerData, setRegisterData }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="w-full space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
                <label
                    htmlFor="username"
                    className={`text-base font-medium text-secondary font-openSans`}
                >
                    Username*
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={registerData.username}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors font-openSans`}
                    required
                />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className={`text-base font-medium text-secondary font-openSans`}
                >
                    Email*
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={registerData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors font-openSans`}
                    required
                />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className={`text-base font-medium text-secondary font-openSans`}
                >
                    Password*
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={registerData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors font-openSans`}
                    required
                />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
                <label
                    htmlFor="confirmPassword"
                    className={`text-base font-medium text-secondary font-openSans`}
                >
                    Confirm Password*
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors font-openSans`}
                    required
                />
            </div>
        </div>
    );
};

export default StepOne;
