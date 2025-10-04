import React from "react";

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

interface StepThreeProps {
    customerData: CustomerData;
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;
}

const StepThree: React.FC<StepThreeProps> = ({
    customerData,
    setCustomerData,
}) => {
    const handleCustomerInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1];
            setCustomerData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value,
                },
            }));
        } else if (name.startsWith("businessInfo.")) {
            const businessField = name.split(".")[1];
            setCustomerData((prev) => ({
                ...prev,
                businessInfo: {
                    ...prev.businessInfo,
                    [businessField]: value,
                },
            }));
        } else {
            setCustomerData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <div className="w-full space-y-4 max-h-96 overflow-y-auto">
            {/* Personal Information */}
            <div className="space-y-4">
                <h4
                    className={`text-sm font-semibold text-secondary border-b pb-2 font-openSans`}
                >
                    Personal Information
                </h4>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="firstName"
                            className={`text-sm font-medium text-secondary font-openSans`}
                        >
                            First Name*
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={customerData.firstName}
                            onChange={handleCustomerInputChange}
                            className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="lastName"
                            className={`text-sm font-medium text-secondary font-openSans`}
                        >
                            Last Name*
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={customerData.lastName}
                            onChange={handleCustomerInputChange}
                            className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="countryCode"
                            className={`text-sm font-medium text-secondary font-openSans`}
                        >
                            Country Code*
                        </label>
                        <select
                            id="countryCode"
                            name="countryCode"
                            value={customerData.countryCode}
                            onChange={handleCustomerInputChange}
                            className={`w-full px-3 py-2 bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                            required
                        >
                            <option value="+1">+1 (US/CA)</option>
                            <option value="+91">+91 (IN)</option>
                            <option value="+44">+44 (UK)</option>
                            <option value="+49">+49 (DE)</option>
                            <option value="+33">+33 (FR)</option>
                            <option value="+61">+61 (AU)</option>
                            <option value="+81">+81 (JP)</option>
                            <option value="+86">+86 (CN)</option>
                        </select>
                    </div>

                    <div className="space-y-2 col-span-2">
                        <label
                            htmlFor="phoneNumber"
                            className={`text-sm font-medium text-secondary font-openSans`}
                        >
                            Phone Number*
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={customerData.phoneNumber}
                            onChange={handleCustomerInputChange}
                            className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
                <h4
                    className={`text-sm font-semibold text-secondary border-b pb-2 font-openSans`}
                >
                    Address Information
                </h4>

                <div className="space-y-2">
                    <label
                        htmlFor="address.street"
                        className={`text-sm font-medium text-secondary font-openSans`}
                    >
                        Street Address*
                    </label>
                    <input
                        id="address.street"
                        name="address.street"
                        type="text"
                        placeholder="Enter your street address"
                        value={customerData.address.street}
                        onChange={handleCustomerInputChange}
                        className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="address.city"
                            className={`text-sm font-medium text-secondary font-openSans`}
                        >
                            City*
                        </label>
                        <input
                            id="address.city"
                            name="address.city"
                            type="text"
                            placeholder="Enter your city"
                            value={customerData.address.city}
                            onChange={handleCustomerInputChange}
                            className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="address.state"
                            className={`text-sm font-medium text-secondary font-openSans`}
                        >
                            State*
                        </label>
                        <input
                            id="address.state"
                            name="address.state"
                            type="text"
                            placeholder="Enter your state"
                            value={customerData.address.state}
                            onChange={handleCustomerInputChange}
                            className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="address.postalCode"
                            className={`text-sm font-medium text-secondary font-openSans`}
                        >
                            Postal Code*
                        </label>
                        <input
                            id="address.postalCode"
                            name="address.postalCode"
                            type="text"
                            placeholder="Enter your postal code"
                            value={customerData.address.postalCode}
                            onChange={handleCustomerInputChange}
                            className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="address.country"
                            className={`text-sm font-medium text-secondary font-openSans`}
                        >
                            Country*
                        </label>
                        <input
                            id="address.country"
                            name="address.country"
                            type="text"
                            placeholder="Enter your country"
                            value={customerData.address.country}
                            onChange={handleCustomerInputChange}
                            className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
                <h4
                    className={`text-sm font-semibold text-secondary border-b pb-2 font-openSans`}
                >
                    Business Information
                </h4>

                <div className="space-y-2">
                    <label
                        htmlFor="businessInfo.companyName"
                        className={`text-sm font-medium text-secondary font-openSans`}
                    >
                        Company Name*
                    </label>
                    <input
                        id="businessInfo.companyName"
                        name="businessInfo.companyName"
                        type="text"
                        placeholder="Enter your company name"
                        value={customerData.businessInfo.companyName}
                        onChange={handleCustomerInputChange}
                        className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="businessInfo.businessType"
                        className={`text-sm font-medium text-secondary font-openSans`}
                    >
                        Business Type*
                    </label>
                    <select
                        id="businessInfo.businessType"
                        name="businessInfo.businessType"
                        value={customerData.businessInfo.businessType}
                        onChange={handleCustomerInputChange}
                        className={`w-full px-3 py-2 bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                        required
                    >
                        <option value="">Select Business Type</option>
                        <option value="Retail">Retail</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Trading">Trading</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="businessInfo.vatNumber"
                        className={`text-sm font-medium text-secondary font-openSans`}
                    >
                        VAT Number*
                    </label>
                    <input
                        id="businessInfo.vatNumber"
                        name="businessInfo.vatNumber"
                        type="text"
                        placeholder="Enter your VAT number"
                        value={customerData.businessInfo.vatNumber}
                        onChange={handleCustomerInputChange}
                        className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="businessInfo.websiteUrl"
                        className={`text-sm font-medium text-secondary font-openSans`}
                    >
                        Website URL (Optional)
                    </label>
                    <input
                        id="businessInfo.websiteUrl"
                        name="businessInfo.websiteUrl"
                        type="url"
                        placeholder="Enter your website URL"
                        value={customerData.businessInfo.websiteUrl}
                        onChange={handleCustomerInputChange}
                        className={`w-full px-3 py-2 placeholder:text-[#D9D0C5] bg-primary/10 rounded-md transition-colors text-sm font-openSans`}
                    />
                </div>
            </div>
        </div>
    );
};

export default StepThree;
