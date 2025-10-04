"use client";

import React from "react";
import { Playfair_Display, Open_Sans, Jost } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Import gem images
import gem3 from "@/public/newHome/FinestGem/finestgem1.jpg";
import greenGem from "@/public/newHome/FinestGem/finestgem2.jpg";
import ruby from "@/public/newHome/FinestGem/finestgem3.jpg";
import yellowGem from "@/public/newHome/FinestGem/finestgem4.jpg";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const jost = Jost({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

// Gem data interface
interface GemData {
    id: string;
    title: string;
    image: any;
    alt: string;
    delay: number;
}

// Gem data array
const gemsData: GemData[] = [
    {
        id: "sapphire",
        title: "Sapphire Selection",
        image: gem3,
        alt: "Sapphire Selection",
        delay: 0.1,
    },
    {
        id: "emerald",
        title: "Emerald Line",
        image: greenGem,
        alt: "Emerald Line",
        delay: 0.2,
    },
    {
        id: "ruby",
        title: "Ruby Collection",
        image: ruby,
        alt: "Ruby Collection",
        delay: 0.3,
    },
    {
        id: "precious",
        title: "Semi Precious Gems",
        image: yellowGem,
        alt: "Semi Precious Gems",
        delay: 0.4,
    },
];

// Individual Gem Card Component
interface GemCardProps {
    gem: GemData;
}

const GemCard: React.FC<GemCardProps> = ({ gem }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: gem.delay }}
            className="group relative text-center cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-t-full aspect-square bg-gray-100">
                {/* Gem Image */}
                <Image
                    src={gem.image}
                    alt={gem.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#d5c4b2bb] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-t-full" />

                {/* Centered Title - Hidden by default, shown on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <h3
                        className={`text-white text-2xl lg:text-3xl font-medium text-center px-4 ${playFair.className}`}
                        style={{ lineHeight: 1 }}
                    >
                        {gem.title}
                    </h3>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#B19271] to-transparent rounded-b-none" />
            </div>
        </motion.div>
    );
};

// Main Component
const FinestGemsSection: React.FC = () => {
    return (
        <section className="relative bg-[#FAF8F2] py-16 lg:py-20">
            <div className="container mx-auto px-4 relative ">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        <div
                            className={`text-md md:text-2xl  text-black font-medium mb-4 tracking-wider ${jost.className}`}
                        >
                            OUR GEMS
                        </div>
                        <h2
                            className={`text-3xl md:text-4xl lg:text-5xl font-normal ${playFair.className}`}
                        >
                            Finest Gems{" "}
                            <span className="block md:inline text-primary">
                                Across The City
                            </span>
                        </h2>
                    </motion.div>

                    {/* Gems Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16 px-4 ">
                        {gemsData.map((gem) => (
                            <GemCard key={gem.id} gem={gem} />
                        ))}
                    </div>

                    {/* Browse Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center"
                    >
                        <Link href="/gemstones">
                            <button className="relative overflow-hidden border cursor-pointer border-[#C49A6C] text-[#C49A6C] font-light hover:bg-[#C49A6C] hover:text-[#FFFFFF] duration-300 px-8 py-3 transition-all group">
                                <span
                                    className={`tracking-wide ${openSans.className}`}
                                >
                                    BROWSE MASTERPIECES
                                </span>
                                {/* Shine effect */}
                                <span className="pointer-events-none absolute top-0 left-[-75%] h-full w-full opacity-60 bg-gradient-to-r from-transparent via-white to-transparent animate-shine" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FinestGemsSection;
