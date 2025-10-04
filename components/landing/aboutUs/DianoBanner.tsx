"use client";

import Image from "next/image";
import React from "react";
// import StarIcon from "../assets/star.png";
import RingImage from "@/app/assets/red-ring.jpg";
import { Playfair_Display, Inter, Open_Sans } from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const DianoBanner = () => {
    return (
        <section className="relative w-full  py-10 bg-[#FAF8F2] text-[#2E2B28]">
            {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-1 right-40" />
  <Image src={StarIcon} alt="star" width={25} height={25} className="absolute bottom-20 left-150" /> */}
            <div className="max-w-7xl mx-auto">
                <div className="w-full  flex flex-col md:flex-row items-center">
                    {/* Left - Text Section */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-4 md:px-0 min-h-[300px]">
                        <div>
                            <h2
                                className={`text-3xl md:text-5xl font-normal text-[#2E2B28] mb-6 leading-snug ${playFair.className}`}
                                style={{
                                    background:
                                        "linear-gradient(to right, #FFDCBB, #54330C)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Experience the DONAI
                                <br className="hidden md:block" /> Difference
                            </h2>
                            <p
                                className={`text-lg text-[#2E2B28CC] mb-8 leading-relaxed md:pl-6 md:pr-6 font-light ${inter.className}`}
                            >
                                Step into a world of rare gems and refined
                                craftsmanship. Schedule your private session or
                                explore our curated collection.
                            </p>
                            <button
                                className={`px-6 py-2 border border-[#2E2B28] text-md text-[#2E2B28] hover:bg-[#2E2B28] hover:text-white transition ${openSans.className}`}
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>

                    {/* Right - Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="w-full aspect-[4/3] relative overflow-hidden">
                            <Image
                                src={RingImage}
                                alt="Red gemstone ring"
                                fill
                                className="h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DianoBanner;
