"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mulish } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
// Import gemstone images
import emeraldAllImg from "@/public/emeraldAll.png";
import emeraldCushionImg from "@/public/emeraldCushion.png";
import emeraldRoundImg from "@/public/emeraldRound.png";
import emeraldOvalImg from "@/public/emeraldOval.png";
import emeraldRectangleImg from "@/public/emeraldRectangle.png";
import sapphireAllImg from "@/public/sapphireAll.png";
import sapphireCushionImg from "@/public/sapphireCushion.png";
import sapphireRoundImg from "@/public/sapphireRound.png";
import sapphireOvalImg from "@/public/sapphireOval.png";
import sapphireRectangleImg from "@/public/sapphireRectangle.png";
import rubyAllImg from "@/public/rubyAll.png";
import rubyCushionImg from "@/public/rubyCushion.png";
import rubyRoundImg from "@/public/rubyRound.png";
import rubyOvalImg from "@/public/rubyOval.png";
import rubyRectangleImg from "@/public/rubyRectangle.png";
// Featured images for each gemstone type
import emeraldFeature from "@/public/emeraldFeature.jpg";
import sapphireFeature from "@/public/sapphireAll.png";
import rubyFeature from "@/public/rubyAll.png";
import semiPreciousFeature from "@/public/semiPreciousFeature.jpg";

const mulish = Mulish({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

// Add proper type definitions
interface GemstoneShape {
    name: string;
    image: StaticImageData;
}

interface GemstoneFilter {
    label: string;
    active: boolean;
    disabled: boolean;
}

interface GemstoneSection {
    section: number;
    shapes: GemstoneShape[];
}

interface GemstoneData {
    filters: GemstoneFilter[];
    Emerald: GemstoneSection[];
    Sapphire: GemstoneSection[];
    Ruby: GemstoneSection[];
    "Semi-precious": GemstoneSection[];
}

interface GemstoneDropdownProps {
    showGemstoneDropdown: boolean;
    setShowGemstoneDropdown: (show: boolean) => void;
}

const GemstoneDropdown: React.FC<GemstoneDropdownProps> = ({
    showGemstoneDropdown,
    setShowGemstoneDropdown,
}) => {
    const Router = useRouter();
    const [activeGemstone, setActiveGemstone] = useState("Emerald");

    // const getFeaturedImage = () => {
    //     switch (activeGemstone) {
    //         case "Emerald":
    //             return emeraldFeature;
    //         case "Sapphire":
    //             return sapphireFeature;
    //         case "Ruby":
    //             return rubyFeature;
    //         case "Semi-precious":
    //             return semiPreciousFeature;
    //         default:
    //             return emeraldFeature;
    //     }
    // };

    const getFeaturedText = () => {
        switch (activeGemstone) {
            case "Emerald":
                return "Featured Emeralds";
            case "Sapphire":
                return "Featured Sapphires";
            case "Ruby":
                return "Featured Rubies";
            case "Semi-precious":
                return "Featured Semi-precious";
            default:
                return "Featured Gemstones";
        }
    };

    const getFeaturedRoute = () => {
        switch (activeGemstone) {
            case "Emerald":
                return "/gemstones/emerald";
            case "Sapphire":
                return "/gemstones/sapphire";
            case "Ruby":
                return "/gemstones/ruby";
            case "Semi-precious":
                return "/gemstones/semi-precious";
            default:
                return "/gemstones";
        }
    };

    // Gemstone data structure with proper typing
    const gemstoneData: GemstoneData = {
        filters: [
            { label: "Emerald", active: false, disabled: false },
            { label: "Sapphire", active: false, disabled: false },
            { label: "Ruby", active: false, disabled: false },
            { label: "Semi-precious", active: false, disabled: false },
        ],
        Emerald: [
            {
                section: 1,
                shapes: [
                    { name: "All Emerald", image: emeraldAllImg },
                    { name: "Cushion", image: emeraldCushionImg },
                ],
            },
            {
                section: 2,
                shapes: [
                    { name: "Round", image: emeraldRoundImg },
                    { name: "Oval", image: emeraldOvalImg },
                ],
            },
            {
                section: 3,
                shapes: [{ name: "Rectangle", image: emeraldRectangleImg }],
            },
        ],
        Sapphire: [
            {
                section: 1,
                shapes: [
                    { name: "All Sapphire", image: sapphireAllImg },
                    { name: "Cushion", image: sapphireCushionImg },
                ],
            },
            {
                section: 2,
                shapes: [
                    { name: "Round", image: sapphireRoundImg },
                    { name: "Oval", image: sapphireOvalImg },
                ],
            },
            {
                section: 3,
                shapes: [{ name: "Rectangle", image: sapphireRectangleImg }],
            },
        ],
        Ruby: [
            {
                section: 1,
                shapes: [
                    { name: "All Ruby", image: rubyAllImg },
                    { name: "Cushion", image: rubyCushionImg },
                ],
            },
            {
                section: 2,
                shapes: [
                    { name: "Round", image: rubyRoundImg },
                    { name: "Oval", image: rubyOvalImg },
                ],
            },
            {
                section: 3,
                shapes: [{ name: "Rectangle", image: rubyRectangleImg }],
            },
        ],
        "Semi-precious": [
            {
                section: 1,
                shapes: [{ name: "Semi Precious", image: emeraldAllImg }], // Fixed typo
            },
        ],
    };

    const handleGemstoneClick = (gemstoneName: string, shapeName: string) => {
        // if (activeGemstone === "Semi-precious") return; // Remove this line

        // Convert shape name for URL (handle spaces and special cases)
        const urlShape = shapeName.toLowerCase().replace(/\s+/g, "-");

        Router.push(`/gemstones/${gemstoneName.toLowerCase()}/${urlShape}`);
        setShowGemstoneDropdown(false);
    };

    const handleFilterClick = (filterLabel: string) => {
        const filter = gemstoneData.filters.find(
            (f) => f.label === filterLabel
        );
        if (filter?.disabled) return;

        // Handle direct navigation for Semi-precious
        if (filterLabel === "Semi-precious") {
            Router.push("/gemstones/semiprecious");
            setShowGemstoneDropdown(false);
            return;
        }

        setActiveGemstone(filterLabel);
    };

    const renderContent = () => {
        const currentData =
            gemstoneData[activeGemstone as keyof typeof gemstoneData];

        if (activeGemstone === "Semi-precious") {
            // This part remains for the redirect functionality
            return (
                <div className="flex justify-center items-center h-32 min-w-[600px]">
                    <div className="text-gray-400 text-lg font-light">
                        Redirecting to Semi-precious collection...
                    </div>
                </div>
            );
        }

        // Flatten all shapes from different sections into one array
        const allShapes = (currentData as GemstoneSection[])?.flatMap(
            (section) => section.shapes
        );

        return (
            <div className="flex justify-start items-center gap-8 p-0">
                {allShapes?.map((shape: GemstoneShape, shapeIndex: number) => (
                    <div
                        key={shapeIndex}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                        onClick={() =>
                            handleGemstoneClick(activeGemstone, shape.name)
                        }
                    >
                        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <Image
                                src={shape.image}
                                alt={shape.name}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div
                            className={`text-sm font-light ${mulish.className} text-[#2E2B28] group-hover:text-[#D6C5A0] transition-colors duration-200`}
                        >
                            {shape.name.replace(` ${activeGemstone}`, "")}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AnimatePresence>
            {showGemstoneDropdown && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-20 transform  mt-0 z-40"
                    onMouseEnter={() => setShowGemstoneDropdown(true)}
                    onMouseLeave={() => setShowGemstoneDropdown(false)}
                >
                    <div className="w-auto py-6 px-8 bg-white shadow-[0px_20px_30px_0px_rgba(0,0,0,0.15)] rounded-lg border border-gray-100">
                        <div className="flex items-start gap-12">
                            {/* Left Filters Section */}
                            <div className="flex flex-col justify-start items-start gap-4">
                                {gemstoneData.filters.map(
                                    (filter: GemstoneFilter, index: number) => (
                                        <div
                                            key={index}
                                            className={`py-2 px-4 rounded-md transition-all duration-200 w-40 text-center ${
                                                filter.disabled
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : activeGemstone ===
                                                      filter.label
                                                    ? "bg-[#181818] border-1 border-primary text-white shadow-md"
                                                    : "bg-white hover:bg-gray-50 cursor-pointer"
                                            }`}
                                            onClick={() =>
                                                !filter.disabled &&
                                                handleFilterClick(filter.label)
                                            }
                                        >
                                            <div
                                                className={`text-sm font-light ${
                                                    mulish.className
                                                } ${
                                                    filter.disabled
                                                        ? "text-gray-400"
                                                        : activeGemstone !==
                                                          filter.label
                                                        ? "text-[#B99876]"
                                                        : "text-white"
                                                }`}
                                            >
                                                {filter.label}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Vertical Separator */}
                            <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                            {/* Dynamic Content */}
                            <div className="flex items-center min-h-[8rem]">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GemstoneDropdown;
