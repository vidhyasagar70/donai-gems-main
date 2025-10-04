"use client";

import React from "react";
import Image from "next/image";
import { Playfair_Display, Jost } from "next/font/google";
import { Mail, Phone } from "lucide-react";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const FooterSection = () => {
    return (
        <footer className="bg-[#181818] text-white">
            <div className="container mx-auto py-20 px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between text-center gap-8">
                    {/* Address */}
                    <div className="lg:w-1/3">
                        <h3 className={`text-xl mb-2 ${playFair.className}`}>
                            Headquaters
                        </h3>
                        <p
                            className={`text-sm text-gray-300 ${jost.className}`}
                        >
                            DONAI GEMS
                            <br />
                            Pelikanstraat 62, Office #1019–1020
                            <br />
                            Antwerpen, 2018, Belgium
                        </p>
                    </div>

                    {/* Logo */}
                    <div className="lg:w-1/3">
                        <Image
                            src="/logo/logo.png"
                            alt="DONAI Logo"
                            width={200}
                            height={100}
                            className="mx-auto"
                        />
                    </div>

                    {/* Contact Us */}
                    <div className="lg:w-1/3">
                        <h3 className={`text-xl mb-2 ${playFair.className}`}>
                            Contact Us
                        </h3>
                        <p
                            className={` flex justify-center  gap-2 text-sm text-gray-300 ${jost.className}`}
                        >
                            <Phone size={15} /> +32 3 233 4309
                        </p>

                        <p
                            className={`mt-2 flex justify-center  gap-2 text-sm text-gray-300 ${jost.className}`}
                        >
                            <Mail size={15} /> info@donaigems.com
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-[#181818] border-t-1 border-gray-700 bg-opacity-20 py-4">
                <div className="container mx-auto">
                    <div className="text-center text-sm text-gray-200">
                        Copyright {new Date().getFullYear()} - DONAI
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
