"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import gem1 from "@/public/ruby.png";
import gem2 from "@/public/YellowGem-NoClipper.png";
import gem3 from "@/app/assets/gem3.jpg";
import gem4 from "@/public/greenGem-NoClipper.png";
import gemhover1 from "@/app/assets/Catgem3.png";
import gemhover2 from "@/public/yellowGemWearing.png";
import gemhover3 from "@/app/assets/featureImg.jpg";
import gemhover4 from "@/public/emeraldHover.jpg";
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
        src1: gem1,
        alt: "GEM 1",
        title: "Ruby Collection",
        description: "Premium rubies from Colombia",
    },
    {
        src1: gem2,
        alt: "GEM 2",
        title: "Precious Gems",
        description: "Certified brilliant cut Gems",
    },
    {
        src1: gem3,
        alt: "GEM 3",
        title: "Sapphire Selection",
        description: "Pigeon blood sapphires from Myanmar",
    },
    {
        src1: gem4,
        alt: "GEM 4",
        title: "Emerald Line",
        description: "Royal blue emeralds from Kashmir",
    },
    {
        src1: gem2,
        alt: "GEM 2",
        title: "Precious Gems",
        description: "Certified brilliant cut Gems",
    },
    // {
    //     src1: gem2,
    //     alt: "GEM 6",
    //     title: "Paraiba Tourmaline",
    //     description: "Electric blue paraiba tourmalines",
    // },
    // {
    //     src1: gem3,
    //     alt: "GEM 7",
    //     title: "Padparadscha Sapphire",
    //     description: "Sunset colored padparadscha",
    // },
];

const Collections = () => {
    return (
        <div className=" mt-25 w-full bg-[#FAF8F2] py-10">
            <div className="max-w-[1500px] mx-auto">
                <h1
                    className={`py-10 ${playFair.className} text-center text-4xl md:text-5xl`}
                    style={{
                        background:
                            "linear-gradient(to right, #FFDCBB, #54330C)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Finest Gems Across The City
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
                                        <div className="relative overflow-hidden rounded-lg group cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                                            {/* Image Container */}
                                            <div className="aspect-square relative overflow-hidden">
                                                <Image
                                                    src={gem.src1}
                                                    alt={gem.alt}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                />

                                                {/* Hover image that appears on hover */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <Image
                                                        src={
                                                            index === 0
                                                                ? gemhover1
                                                                : index === 1
                                                                ? gemhover2
                                                                : index === 2
                                                                ? gemhover3
                                                                : index === 3
                                                                ? gemhover4
                                                                : gemhover2
                                                        }
                                                        alt={`${gem.alt} hover`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    />
                                                </div>

                                                {/* Title overlay that shows on hover */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                    <h3
                                                        className={`text-lg font-medium ${playFair.className}`}
                                                    >
                                                        {gem.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            {/* <div className="p-4">
                                            <h3
                                                className={`text-lg font-medium text-center text-gray-800 ${playFair.className}`}
                                            >
                                                {gem.title}
                                            </h3>
                                        </div> */}
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Custom styled navigation buttons */}
                        <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-300 hover:border-[#C49A6C] text-gray-600 hover:text-[#C49A6C] shadow-lg" />
                        <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-300 hover:border-[#C49A6C] text-gray-600 hover:text-[#C49A6C] shadow-lg" />
                    </Carousel>
                </div>

                {/* Browse Button */}
                <div className="flex justify-center mt-8">
                    <Link href={"/gemstones"}>
                        <button className="relative overflow-hidden border cursor-pointer border-[#C49A6C] text-[#C49A6C] font-light hover:bg-[#C49A6C] hover:text-[#FFFFFF] duration-300 px-8 py-2 rounded-md transition-all">
                            BROWSE MASTERPIECES
                            {/* Shine effect */}
                            <span className="pointer-events-none absolute top-0 left-[-75%] h-full w-full opacity-60 bg-gradient-to-r from-transparent via-white to-transparent animate-shine" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Collections;
