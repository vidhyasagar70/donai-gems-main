"use client";
import React from "react";
import { Playfair_Display, Marcellus, Jost } from "next/font/google";
import Image from "next/image";
import fig1 from "@/public/newHome/green-ring.jpg";
import fig2 from "@/public/newHome/green-pendant.jpg";
import fig3 from "@/public/newHome/yelloe-Ring2.jpg";
import fig4 from "@/public/newHome/Red-gem.jpg";
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
const marcellus = Marcellus({
    subsets: ["latin"],
    weight: ["400"],
});
const jost = Jost({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const Gems = [
    {
        src: fig1,
        alt: "GEM 1",
        desc: "Emerald Gemstone",
        description: "Finest quality natural emeralds from Burma",
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
        desc: "Precious Ruby Gem",
        description: "Carefully curated precious gemstone collection",
    },
    {
        src: fig2,
        alt: "GEM 6",
        desc: "Emerald",
        description: "Rare Emerald from the foothills of Kilimanjaro",
    },
];

const CategoriesSection = () => {
    return (
        <div className="max-w-7xl mx-auto mt-25 w-full py-10">
            <div
                className={`text-md md:text-2xl text-center text-black font-medium mb-7 tracking-wider ${jost.className}`}
            >
                OUR JEWELS
            </div>
            <h1
                className={`pb-10 ${playFair.className} text-center text-4xl md:text-5xl`}
            >
                Explore by <span className="text-primary">Stylish Jewels</span>
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
                                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-125"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                />

                                                {/* Dark overlay that appears on hover */}
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10" />

                                                {/* "View" text in center - appears on hover with scale animation */}
                                                <div
                                                    className={`absolute inset-0 flex items-center justify-center  opacity-0 scale-[3] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out ${marcellus.className}`}
                                                >
                                                    <h4 className="text-white text-2xl font-medium mb-0">
                                                        View
                                                    </h4>
                                                </div>

                                                {/* Bottom content that scales in on hover */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4  opacity-0 scale-[3] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-center ease-in-out">
                                                    <h5
                                                        className={`text-black text-lg font-medium mb-1 ${playFair.className}`}
                                                    >
                                                        {gem.desc}
                                                    </h5>
                                                    <h6 className="text-black text-sm opacity-90">
                                                        {gem.description}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Custom styled navigation buttons */}
                    {/* <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-300 hover:border-[#C49A6C] text-gray-600 hover:text-[#C49A6C] shadow-lg" />
                    <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-300 hover:border-[#C49A6C] text-gray-600 hover:text-[#C49A6C] shadow-lg" /> */}
                </Carousel>
            </div>

            {/* Browse Button with Shine Effect */}
            <div className="flex justify-center mt-8">
                <Link href={"/gemstones"}>
                    <button className="relative overflow-hidden border cursor-pointer border-[#C49A6C] text-[#C49A6C] font-light hover:bg-[#C49A6C] hover:text-[#FFFFFF] duration-300 px-8 py-3 transition-all group">
                        <span className={`tracking-wide `}>
                            VIEW ALL STYLES
                        </span>
                        {/* Shine effect */}
                        <span className="pointer-events-none absolute top-0 left-[-75%] h-full w-full opacity-60 bg-gradient-to-r from-transparent via-white to-transparent animate-shine" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CategoriesSection;
