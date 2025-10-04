interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface OTPData {
    email: string;
    otp: string;
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
