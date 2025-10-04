"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mulish } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import allJewelry from "@/app/assets/allJewelery.png";
import bracelet from "@/app/assets/bracelete.png";
import fingerRing from "@/app/assets/fingerRing.png";
import necklace from "@/app/assets/necklace.png";
import necklaceSet from "@/app/assets/necklaceSet.png";
import pendants from "@/app/assets/pendants.png";
import categoryFeature from "@/app/assets/featureImg.jpg";
import gemsFeature from "@/public/gemsCollectionFeature.jpg";
import occasionFeature from "@/public/occasionFeature.jpg";
import genderFeature from "@/public/genderFeature.jpg";
import round from "@/public/round.png";
import bagutte from "@/public/baguette.png";
import cushion from "@/public/cushion.png";
import emerald from "@/public/emerald.png";
import marquise from "@/public/marquise.png";
import oldeuropean from "@/public/oldEuropean.png";
import oval from "@/public/oval.png";
import princess from "@/public/princess.png";
import rose from "@/public/rose.png";
import occasionAll from "@/public/occasionAll.png";
import occasionMilestone from "@/public/occasionMilestone.png";
import occasionAniversary from "@/public/occasionAniversary.png";
import occasionGifts from "@/public/occasionGifts.png";
import occasionWedding from "@/public/occasionWedding.png";
import occasionCelebration from "@/public/occasionCelebration.png";
import genderMale from "@/public/genderMale.png";

const mulish = Mulish({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

// Add proper type definitions
interface GemShape {
    name: string;
    icon: StaticImageData;
}

interface Category {
    name: string;
    image: StaticImageData;
}

interface Occasion {
    name: string;
    image: StaticImageData;
}

interface Gender {
    name: string;
    image: StaticImageData;
}

interface CategorySection {
    section: number;
    categories: Category[];
}

interface GemsDesignSection {
    section: number;
    gemShapes: GemShape[];
}

interface OccasionSection {
    section: number;
    occasions: Occasion[];
}

interface GenderSection {
    section: number;
    genders: Gender[];
}

interface Filter {
    label: string;
    active: boolean;
}

interface CategoryData {
    filters: Filter[];
    Category: CategorySection[];
    "Gems Design": GemsDesignSection[];
    Occasion: OccasionSection[];
    Gender: GenderSection[];
}

interface CategoriesDropdownProps {
    showCategoriesDropdown: boolean;
    setShowCategoriesDropdown: (show: boolean) => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({
    showCategoriesDropdown,
    setShowCategoriesDropdown,
}) => {
    const Router = useRouter();
    const [activeFilter, setActiveFilter] = useState("Category");

    const getFeaturedImage = () => {
        switch (activeFilter) {
            case "Category":
                return categoryFeature;
            case "Gems Design":
                return gemsFeature;
            case "Occasion":
                return occasionFeature;
            case "Gender":
                return genderFeature;
            default:
                return categoryFeature;
        }
    };

    const getFeaturedText = () => {
        switch (activeFilter) {
            case "Category":
                return "Featured Categories";
            case "Gems Design":
                return "Featured Designs";
            case "Occasion":
                return "Featured Occasions";
            case "Gender":
                return "Featured Collections";
            default:
                return "Featured";
        }
    };

    const getFeaturedRoute = () => {
        switch (activeFilter) {
            case "Category":
                return "/categories";
            case "Gems Design":
                return "/gems-design";
            case "Occasion":
                return "/occasions";
            case "Gender":
                return "/gender-collections";
            default:
                return "/categories";
        }
    };

    // Categories data with proper typing
    const categoryData: CategoryData = {
        filters: [
            { label: "Category", active: false },
            { label: "Gems Design", active: false },
            { label: "Occasion", active: false },
            { label: "Gender", active: false },
        ],
        Category: [
            {
                section: 1,
                categories: [
                    { name: "All Jewelry", image: allJewelry },
                    { name: "Finger Rings", image: fingerRing },
                ],
            },
            {
                section: 2,
                categories: [
                    { name: "Necklaces", image: necklace },
                    { name: "Bracelets", image: bracelet },
                ],
            },
            {
                section: 3,
                categories: [
                    { name: "Pendants", image: pendants },
                    { name: "Necklace Set", image: necklaceSet },
                ],
            },
        ],
        "Gems Design": [
            {
                section: 1,
                gemShapes: [
                    { name: "Round", icon: round },
                    { name: "Baguette", icon: bagutte },
                    { name: "Marquise", icon: marquise },
                ],
            },
            {
                section: 2,
                gemShapes: [
                    { name: "Old European", icon: oldeuropean },
                    { name: "Cushion", icon: cushion },
                    { name: "Princess", icon: princess },
                ],
            },
            {
                section: 3,
                gemShapes: [
                    { name: "Emerald", icon: emerald },
                    { name: "Rose", icon: rose },
                    { name: "Oval", icon: oval },
                ],
            },
        ],
        Occasion: [
            {
                section: 1,
                occasions: [
                    { name: "All", image: occasionAll },
                    { name: "Wedding", image: occasionWedding },
                ],
            },
            {
                section: 2,
                occasions: [
                    { name: "Anniversary", image: occasionAniversary },
                    { name: "Celebration", image: occasionCelebration },
                ],
            },
            {
                section: 3,
                occasions: [
                    { name: "Milestone", image: occasionMilestone },
                    { name: "Gifts", image: occasionGifts },
                ],
            },
        ],
        Gender: [
            {
                section: 1,
                genders: [{ name: "Men", image: genderMale }],
            },
            {
                section: 2,
                genders: [{ name: "Women", image: necklace }],
            },
            {
                section: 3,
                genders: [{ name: "Other", image: allJewelry }],
            },
        ],
    };

    const handleCategoryClick = (categoryName: string) => {
        Router.push(
            `/categories/${categoryName.toLowerCase().replace(/\s+/g, "-")}`
        );
        setShowCategoriesDropdown(false);
    };

    const handleFilterClick = (filterLabel: string) => {
        setActiveFilter(filterLabel);
    };

    const renderContent = () => {
        const currentData =
            categoryData[activeFilter as keyof typeof categoryData];

        if (activeFilter === "Gems Design") {
            return (
                <div className="flex justify-around items-start gap-14 p-0">
                    {(currentData as GemsDesignSection[])?.map(
                        (section: GemsDesignSection, sectionIndex: number) => (
                            <div
                                key={sectionIndex}
                                className="relative w-full last:after:hidden after:absolute after:right-0 after:top-0 after:w-px after:h-full after:bg-gradient-to-b after:from-transparent after:via-gray-300 after:to-transparent"
                            >
                                <div className="flex flex-col justify-center items-start gap-6">
                                    {section.gemShapes?.map(
                                        (
                                            shape: GemShape,
                                            shapeIndex: number
                                        ) => (
                                            <div
                                                key={shapeIndex}
                                                className="flex justify-start items-center gap-3 cursor-pointer group"
                                                onClick={() =>
                                                    console.log(
                                                        `Selected shape: ${shape.name}`
                                                    )
                                                }
                                            >
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <Image
                                                        src={shape.icon}
                                                        alt={shape.name}
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div
                                                    className={`text-sm font-light ${mulish.className} text-[#2E2B28] group-hover:text-[#D6C5A0] transition-colors duration-200`}
                                                >
                                                    {shape.name}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            );
        }

        if (activeFilter === "Occasion") {
            return (
                <div className="flex justify-around items-start gap-14 p-0">
                    {(currentData as OccasionSection[])?.map(
                        (section: OccasionSection, sectionIndex: number) => (
                            <div
                                key={sectionIndex}
                                className="relative w-full last:after:hidden after:absolute after:right-0 after:top-0 after:w-px after:h-full after:bg-gradient-to-b after:from-transparent after:via-gray-300 after:to-transparent"
                            >
                                <div className="flex flex-col justify-center items-start gap-6">
                                    {section.occasions?.map(
                                        (
                                            occasion: Occasion,
                                            occasionIndex: number
                                        ) => (
                                            <div
                                                key={occasionIndex}
                                                className="flex justify-start items-center gap-3 cursor-pointer group"
                                                onClick={() =>
                                                    console.log(
                                                        `Selected occasion: ${occasion.name}`
                                                    )
                                                }
                                            >
                                                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <Image
                                                        src={occasion.image}
                                                        alt={occasion.name}
                                                        width={40}
                                                        height={40}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div
                                                    className={`text-sm font-light ${mulish.className} text-[#2E2B28] group-hover:text-[#D6C5A0] transition-colors duration-200`}
                                                >
                                                    {occasion.name}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            );
        }

        if (activeFilter === "Category") {
            return (
                <div className="flex justify-center items-start gap-14">
                    {(currentData as CategorySection[])?.map(
                        (section: CategorySection, sectionIndex: number) => (
                            <div
                                key={sectionIndex}
                                className="relative w-full last:after:hidden after:absolute after:right-0 after:top-0 after:w-px after:h-full after:bg-gradient-to-b after:from-transparent after:via-gray-300 after:to-transparent"
                            >
                                <div className="flex flex-col justify-center items-start gap-6">
                                    {section.categories?.map(
                                        (
                                            category: Category,
                                            categoryIndex: number
                                        ) => (
                                            <div
                                                key={categoryIndex}
                                                className="flex justify-start items-center gap-3 cursor-pointer group"
                                                onClick={() =>
                                                    handleCategoryClick(
                                                        category.name
                                                    )
                                                }
                                            >
                                                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <Image
                                                        src={category.image}
                                                        alt={category.name}
                                                        width={40}
                                                        height={40}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div
                                                    className={`text-sm font-light ${mulish.className} text-[#2E2B28] group-hover:text-[#D6C5A0] transition-colors duration-200`}
                                                >
                                                    {category.name}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            );
        }

        if (activeFilter === "Gender") {
            return (
                <div className="flex justify-around items-start gap-14 p-0">
                    {(currentData as GenderSection[])?.map(
                        (section: GenderSection, sectionIndex: number) => (
                            <div
                                key={sectionIndex}
                                className="relative w-full h-30 last:after:hidden after:absolute after:right-0 after:top-0 after:w-px after:h-full after:bg-gradient-to-b after:from-transparent after:via-gray-300 after:to-transparent"
                            >
                                <div className="flex flex-col justify-center items-start gap-6">
                                    {section.genders?.map(
                                        (item: Gender, itemIndex: number) => (
                                            <div
                                                key={itemIndex}
                                                className="flex justify-start items-center gap-3 cursor-pointer group"
                                                onClick={() =>
                                                    console.log(
                                                        `Selected: ${item.name}`
                                                    )
                                                }
                                            >
                                                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={40}
                                                        height={40}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div
                                                    className={`text-sm font-light ${mulish.className} text-[#2E2B28] group-hover:text-[#D6C5A0] transition-colors duration-200`}
                                                >
                                                    {item.name}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <AnimatePresence>
            {showCategoriesDropdown && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 z-40"
                    onMouseEnter={() => setShowCategoriesDropdown(true)}
                    onMouseLeave={() => setShowCategoriesDropdown(false)}
                >
                    <div className="w-fit py-6 bg-white shadow-[0px_20px_30px_0px_rgba(0,0,0,0.15)] rounded-lg border border-gray-100">
                        <div className="flex justify-between items-start gap-0 px-6">
                            {/* Left Filters Section */}
                            <div className="flex flex-col justify-start items-start gap-4">
                                {categoryData.filters.map(
                                    (filter: Filter, index: number) => (
                                        <div
                                            key={index}
                                            className={`py-1 ${
                                                activeFilter === filter.label
                                                    ? "border border-black rounded-sm px-3 shadow-md"
                                                    : "bg-white hover:bg-gray-50"
                                            } cursor-pointer transition-all duration-200`}
                                            onClick={() =>
                                                handleFilterClick(filter.label)
                                            }
                                        >
                                            <div
                                                className={`text-sm font-light ${
                                                    mulish.className
                                                } ${
                                                    activeFilter ===
                                                    filter.label
                                                        ? "text-[#2E2B28]"
                                                        : "text-[#2E2B28]"
                                                }`}
                                            >
                                                {filter.label}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Vertical Separator */}
                            <div className="w-px h-48 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                            {/* Dynamic Content */}
                            <div className="min-w-[600px] p-0">
                                {renderContent()}
                            </div>

                            {/* Vertical Separator */}
                            <div className="w-px h-48 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                            {/* Right Image Section */}
                            <div className="flex flex-col justify-end items-start gap-4">
                                <div className="w-50 cursor-pointer h-48 rounded-lg overflow-hidden relative group">
                                    <Image
                                        src={getFeaturedImage()}
                                        alt={`Featured ${activeFilter}`}
                                        fill
                                        className="object-cover transition-all duration-500 group-hover:scale-105"
                                        key={activeFilter}
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                        <div className="text-white text-lg font-light">
                                            {getFeaturedText()}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={`text-[#2E2B28] text-lg font-light ${mulish.className} underline hover:text-[#D6C5A0] transition-colors duration-200`}
                                    onClick={() =>
                                        Router.push(getFeaturedRoute())
                                    }
                                >
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CategoriesDropdown;
