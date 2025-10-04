import React from "react";
import { Playfair_Display, Open_Sans, Marcellus } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import gem11 from "@/public/newHome/buildOnCraft/img2.jpg";
import gem12 from "@/public/HearPreciousStone.jpg";
import gem13 from "@/public/newHome/CategoriesSection/img4.jpg";
import gem14 from "@/public/newHome/RedRing2.jpg";
import gem15 from "@/public/Blue-Ring-zoomed.jpg";
import { Button } from "../ui/button";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const marcellus = Marcellus({
    subsets: ["latin"],
    weight: ["400"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const Gems = [
    { src: gem11, alt: "Gem 1" },
    { src: gem12, alt: "Gem 2" },
    { src: gem13, alt: "Gem 3" },
    { src: gem14, alt: "Gem 4" },
    { src: gem15, alt: "Gem 5" },
];

const CollectionsSection = () => {
    return (
        <section className="relative py-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2
                        className={`text-4xl md:text-5xl font-normal ${playFair.className}`}
                    >
                        Our{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(to right, #FFDCBB, #54330C)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Inventory
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
                    {Gems.map((gem, index) => (
                        <Link
                            href="/jewellery"
                            key={index}
                            className="block group"
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <div
                                    className={`absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-[3] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out ${marcellus.className}`}
                                >
                                    <h4 className="text-white text-2xl font-medium mb-0">
                                        View
                                    </h4>
                                </div>
                                {/* Dark overlay that appears on hover */}
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10" />
                                <Image
                                    src={gem.src}
                                    alt={gem.alt}
                                    width={400}
                                    height={400}
                                    className="w-full aspect-square h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                    ))}

                    <div className="overflow-hidden group flex justify-center items-center text-center bg-[#AB8965] rounded-lg p-6 group border border-transparent hover:border-gray-300 transition-colors">
                        <Link href="/jewellery" className="w-full">
                            <div
                                className={`${openSans.className} text-sm text-gray-700`}
                            >
                                Explore Full Inventory
                            </div>
                            <h3
                                className={`text-5xl leading-tight my-2 ${marcellus.className}`}
                            >
                                10+
                            </h3>
                            <div className="  items-center justify-center z-20 opacity-0 scale-[3] group-hover:opacity-100 group-hover:scale-100  duration-300 ease-in-out   inline-block text-sm text-gray-800 border-b border-gray-800 group-hover:border-b-2 transition-all">
                                <Button className="bg-black rounded-none text-[#AB8965] hover:bg-black hover:text-[#AB8965]">
                                    View Details
                                </Button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionsSection;
