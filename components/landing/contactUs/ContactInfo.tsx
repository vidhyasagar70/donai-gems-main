"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactImage from "@/app/assets/Frame 1075.jpg";
import { FaInstagram } from "react-icons/fa";
import { LuFacebook, LuLinkedin, LuTwitter } from "react-icons/lu";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const ContactInfo = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full px-4 md:px-20 py-10 bg-white"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start md:mt-13">
                {/* Left Side */}
                <div className="flex flex-col justify-between h-full">
                    {/* Title */}
                    <h2
                        className={`text-5xl font-normal mb-4 ${playFair.className}`}
                        style={{
                            background:
                                "linear-gradient(to right, #54330C, #FFDCBB)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Contact Information
                    </h2>

                    {/* Description */}
                    <p
                        className="text-md font-light text-[#2E2B28] opacity-80 leading-relaxed mb-4"
                        style={{ fontFamily: "Inter" }}
                    >
                        Visit our private studio or schedule a digital
                        consultation. Our specialists are here to assist with
                        gemstone selection, customization, and personal styling.
                    </p>

                    {/* Location */}
                    <div
                        className="text-md text-[#2E2B28] space-y-1 mb-6"
                        style={{ fontFamily: "Inter" }}
                    >
                        <h4 className="font-normal">Location</h4>
                        <div className="text-sm">
                            <p>DONAI GEMS</p>
                            <p>Pelikanstraat 62,</p>
                            <p>Diamantclub Van</p>
                            <p>
                                Antwerpen, Office #1019–1020 , Antwerpen, 2018,
                            </p>
                            <p>Belgium VAT:</p>
                            <p>BE0705.917.993</p>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="border-t border-gray-300 pt-4 flex flex-row">
                        <h3
                            className="text-lg font-regular mb-2 md:mr-5 mr-5 mt-1"
                            style={{ fontFamily: "Inter" }}
                        >
                            Follow Us
                        </h3>

                        <div className="flex space-x-3">
                            {[
                                LuFacebook,
                                FaInstagram,
                                LuLinkedin,
                                LuTwitter,
                            ].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-[#2E2B28] hover:bg-[#2E2B28] hover:text-white hover:shadow transition"
                                >
                                    <Icon size={22} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Image */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full h-full"
                >
                    <div className="relative w-full h-full min-h-[300px] rounded overflow-hidden shadow-sm">
                        <Image
                            src={ContactImage}
                            alt="Green Gem Necklace"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ContactInfo;
