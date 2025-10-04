"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";
import HeroBanner from "@/public/newHome/WelcomeSection/banner-gold.jpg";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HeroBanner}
                    alt="Gemstone Hero Background"
                    fill
                    className="object-cover"
                    priority
                    quality={95}
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black opacity-10 " />
            </div>

            {/* Content Container */}
            {/* <div className="relative bg-red-400  mx-auto px-6 py-24"> */}
            <div className="absolute top-20 left-30  ">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white"
                    style={{ marginTop: "100px" }}
                >
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-3xl md:text-3xl lg:text-4xl max-w-xl font-normal leading-tight mb-6 text-black  ${playfair.className}`}
                    >
                        Where Gems Meet
                        <br />
                        <h1 className="text-[100px] my-0 leading-25 capitalize">
                            ELEGANCE
                        </h1>
                    </motion.span>

                    {/* <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`text-md leading-relaxed mb-8 max-w-md font-light text-black ${inter.className}`}
                    >
                        Discover timeless diamonds and rare gemstones, crafted
                        to perfection and designed to define your legacy.
                    </motion.p> */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Link href="/gemstones">
                            <button className="group cursor-pointer relative overflow-hidden bg-[#927650]  px-5 py-2 text-white hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] transition-all duration-300 ease-in-out">
                                <span className="relative text-sm  font-medium tracking-wide">
                                    EXPLORE MORE
                                </span>
                                {/* Button hover effect */}
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
            {/* </div> */}
        </section>
    );
};

export default HeroSection;
