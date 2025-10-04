import React from "react";
import { Playfair_Display, Open_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import gem11 from "@/app/assets/gem11.jpg";
import gem12 from "@/public/HearPreciousStone.jpg";
import gem13 from "@/app/assets/gem13.jpg";
import gem14 from "@/app/assets/gem14.jpg";
import gem15 from "@/app/assets/gem15.jpg";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
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

const Collections = () => {
    return (
        <div className="max-w-5xl mx-auto w-full py-10 px-4">
            {/* Title */}
            <h1
                className={`text-4xl md:text-5xl text-center mb-5 ${playFair.className} mb-2 mt-15`}
                style={{
                    background: "linear-gradient(to right, #FFDCBB, #54330C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Our Inventory
            </h1>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 max-w-5xl mx-auto">
                {Gems.map((gem, index) => (
                    <Link href="/jewelery" key={index}>
                        <div className="rounded-lg border border-[#C49A6C66] cursor-pointer overflow-hidden group">
                            <Image
                                src={gem.src}
                                alt={gem.alt}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                    </Link>
                ))}

                {/* Last Card */}
                <Link
                    href="/jewelery"
                    className="flex flex-col items-center justify-center border border-[#C49A6C66] rounded-sm text-center py-10 px-5 bg-[#FFFFFF66] hover:bg-[#FFFFFF80] transition-colors duration-300"
                >
                    <h2
                        className={`${playFair.className} text-5xl text-[#54330C] mb-2`}
                        style={{
                            background:
                                "linear-gradient(to right, #FFDCBB, #54330C)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        10+
                    </h2>
                    <p
                        className={`${openSans.className} text-[#2E2B28CC] text-md font-light mb-2`}
                    >
                        Explore Full Inventory
                    </p>
                    <span className="text-sm text-[#2E2B28CC] underline font-light">
                        View All
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Collections;
