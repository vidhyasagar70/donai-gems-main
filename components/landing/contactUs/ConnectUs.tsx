"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import RingImage from "@/app/assets/red-hand-ring.jpg";
import StarIcon from "@/app/assets/star.png";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const ContactForm = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full bg-[#ffffff]  px-4 md:px-24 my-20 "
        >
            {/* Decorative Stars */}

            {/* Section Title */}

            {/* Grid Layout */}
            <div
                className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center ${inter.className}`}
            >
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="w-full hidden lg:block h-full"
                >
                    <div className="relative w-full h-full min-h-[420px]">
                        <Image
                            src={RingImage}
                            alt="Ring on hand"
                            fill
                            className="object-cover rounded"
                        />
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center h-full"
                >
                    <div className="w-full h-full flex flex-col justify-center min-h-[420px]">
                        <form className="space-y-6 flex-1 flex flex-col justify-between">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-normal text-[#000000]">
                                        First Name*
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="mt-1 block w-full border-b border-gray-300 outline-none py-1 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-normal text-[#000000]">
                                        Last Name*
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="mt-1 block w-full border-b border-gray-300 outline-none py-1 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-normal text-[#000000]">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="mt-1 block w-full border-b border-gray-300 outline-none py-1 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-normal text-[#000000]">
                                        Phone*
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="mt-1 block w-full border-b border-gray-300 outline-none py-1 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-normal text-[#000000]">
                                    Message*
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Enter your message here..."
                                    className="mt-1 block w-full border-b border-gray-300 outline-none py-1 text-sm resize-none"
                                ></textarea>
                            </div>

                            <div className="flex items-start justify-between flex-wrap gap-y-4 mt-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 border-gray-300"
                                    />
                                    <label className="text-sm text-[#000000]">
                                        I hereby agree to{" "}
                                        <Link
                                            href="#"
                                            className="underline text-[#000000]"
                                        >
                                            Terms & Conditions
                                        </Link>{" "}
                                        of DONAI
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="px-6 py-2 border border-[#2E2B28] text-sm text-[#2E2B28] hover:bg-[#2E2B28] hover:text-white transition"
                                >
                                    SUBMIT NOW
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ContactForm;
