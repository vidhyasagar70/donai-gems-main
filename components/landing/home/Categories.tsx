"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import fig1 from "@/app/assets/fig1.jpg";
import fig2 from "@/app/assets/fig2.jpg";
import fig3 from "@/public/HearPreciousStone.jpg";
import fig4 from "@/app/assets/fig4.jpg";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const Gems = [
    {
        src: fig1,
        alt: "GEM 1",
        desc: "Ruby Gemstone",
        description: "Finest quality natural rubies from Burma",
    },
    {
        src: fig2,
        alt: "GEM 2",
        desc: "Emerald",
        description: "Premium Colombian Emeralds with exceptional clarity",
    },
    {
        src: fig3,
        alt: "GEM 3",
        desc: "Precious Stone",
        description: "Precious Stones from Ceylon",
    },
    {
        src: fig4,
        alt: "GEM 4",
        desc: "Semi Precious",
        description: "Carefully curated semi-precious gemstone collection",
    },
    {
        src: fig1,
        alt: "GEM 5",
        desc: "Ruby",
        description: "Brilliant cut rubies with exceptional fire",
    },
    {
        src: fig2,
        alt: "GEM 6",
        desc: "Tanzanite",
        description: "Rare tanzanites from the foothills of Kilimanjaro",
    },
    {
        src: fig3,
        alt: "GEM 7",
        desc: "Tourmaline",
        description: "Vibrant tourmalines in various stunning colors",
    },
];

const Categories = () => {
    return (
        <div className="max-w-7xl mx-auto mt-25 w-full py-10">
            <h1
                className={`py-10 ${playFair.className} text-center text-4xl md:text-5xl`}
                style={{
                    background: "linear-gradient(to right, #FFDCBB, #54330C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Explore by Stylish Jewels
            </h1>

            <div className="px-4 md:px-12">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {Gems.map((gem, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                            >
                                <div className="p-1">
                                    <Link href={"/gemstones"}>
                                        <div className="relative overflow-hidden rounded-lg group cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                                            {/* Image Container */}
                                            <div className="aspect-square relative overflow-hidden">
                                                <Image
                                                    src={gem.src}
                                                    alt={gem.alt}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                />

                                                {/* Overlay with gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                {/* Content overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                    <h3
                                                        className={`text-lg font-medium mb-1 ${playFair.className}`}
                                                    >
                                                        {gem.desc}
                                                    </h3>
                                                    <p className="text-sm opacity-90">
                                                        {gem.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            {/* <div className="p-4">
                                                <h3
                                                    className={`text-lg font-medium text-center text-gray-800 group-hover:text-[#54330C] transition-colors duration-300 ${playFair.className}`}
                                                >
                                                    {gem.desc}
                                                </h3>
                                            </div> */}
                                        </div>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Custom styled navigation buttons */}
                    <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-300 hover:border-[#C49A6C] text-gray-600 hover:text-[#C49A6C] shadow-lg" />
                    <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-300 hover:border-[#C49A6C] text-gray-600 hover:text-[#C49A6C] shadow-lg" />
                </Carousel>
            </div>

            {/* Browse Button with Shine Effect */}
            <div className="flex justify-center mt-8">
                <Link href={"/gemstones"}>
                    <button className="relative overflow-hidden border cursor-pointer border-[#2E2B28] text-[#2E2B28] font-light hover:bg-[#2E2B28] hover:text-white transition-all duration-300 px-8 py-2 rounded-md">
                        VIEW ALL STYLES
                        {/* Shine effect */}
                        <span className="pointer-events-none absolute top-0 left-[-75%] h-full w-full opacity-60 bg-gradient-to-r from-transparent via-white to-transparent animate-shine" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Categories;
