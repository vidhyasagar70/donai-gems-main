"use client";
import React from "react";
import ConnectUs from "../../components/landing/contactUs/ConnectUs";
import BannerSection from "@/components/newAboutUs/BannerSection";
import { ReactLenis, useLenis } from "lenis/react";

const Page = () => {
    const lenis = useLenis((lenis) => {
        console.log(lenis);
    });
    return (
        <>
            <ReactLenis root />
            <BannerSection
                title="Contact Us"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Contact Us", path: "/Contact", active: true },
                ]}
            >
                Have a question or need guidance? Our experts are here to help
                you choose the perfect gem with confidence.
            </BannerSection>
            <ConnectUs />
        </>
    );
};

export default Page;
