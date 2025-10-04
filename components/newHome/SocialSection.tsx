"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { Playfair_Display, Jost } from "next/font/google";

// Placeholder images - replace with your actual image paths
import img1 from "@/public/newHome/buildOnCraft/img2.jpg";
import img2 from "@/public/newHome/CategoriesSection/img4.jpg";
import img3 from "@/public/saphhireRing.jpeg";
import img4 from "@/public/newHome/CategoriesSection/sami-precease.jpg";
import img5 from "@/public/newHome/socialSection/handBracelet.jpg";
import img6 from "@/public/newHome/socialSection/greenNecklace.jpg";
import img7 from "@/public/newHome/socialSection/semiprecious-yellow-ring.jpg";
import img8 from "@/public/newHome/socialSection/greenRing.jpg";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const images = [
    { src: img1, alt: "Instagram post 1" },
    { src: img5, alt: "Instagram post 2" },
    { src: img3, alt: "Instagram post 3" },
    { src: img7, alt: "Instagram post 4" },
    { src: img2, alt: "Instagram post 5" },
    { src: img6, alt: "Instagram post 6" },
    { src: img4, alt: "Instagram post 7" },
    { src: img8, alt: "Instagram post 8" },
];

const SocialSection = () => {
    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeInOut",
            },
        }),
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.1 + 0.3,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    return (
        <section className="bg-[#FAF8F2] relative pt-20 overflow-hidden">
            <div className="container mx-auto relative z-10 px-4">
                <div className="flex flex-col items-center mb-12 text-center">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className={`text-lg text-[#D6C5A0] uppercase tracking-widest ${jost.className}`}
                    >
                        Our Instagram
                    </motion.div>
                    <motion.h2
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <a
                            href="https://www.instagram.com/donaicollection/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-4xl md:text-5xl text-[#2E2B28] hover:text-[#D6C5A0] transition-colors duration-300 ${playFair.className}`}
                        >
                            @Donaicollection
                        </a>
                    </motion.h2>
                </div>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-4 md:grid-cols-8">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={imageVariants}
                        >
                            <a
                                href="https://www.instagram.com/donaicollection/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group relative overflow-hidden text-light"
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover aspect-square transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 bg-opacity-40 flex items-center justify-center text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <FaInstagram />
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialSection;
