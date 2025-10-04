"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gem3 from "@/public/ourStory.jpg";
// import StarIcon from "../assets/star.png";
import { Playfair_Display, Open_Sans } from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const OurStory = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="my-20"
        >
            <div className="bg-[#FAF8F2] py-10">
                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between gap-5 ">
                    {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-238 left-5" />
        <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-330 left-150" /> */}
                    {/* Info Section */}
                    <div className="flex flex-col pl-10 py-10 max-w-lg  items-center lg:items-start">
                        <h1
                            className={`${playFair.className} text-5xl text-center lg:text-left`}
                            style={{
                                fontWeight: 400,
                                background:
                                    "linear-gradient(to right, #FFDCBB, #54330C)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            The Diamond Capital of the World
                        </h1>
                        <div className={`mt-10  font-light text-md lg:text-xl`}>
                            <p>
                                Our roots run deep in Antwerp, the historical
                                heart of the global diamond and gemstone trade.
                                Located in the prestigious Diamond Street, we
                                operate inside a legacy market trusted for:
                            </p>
                            <ul className="mt-4 space-y-5 list-none">
                                <li className="flex items-start">
                                    <span className="text-[#D6C5A0] mr-3 mt-1">
                                        •
                                    </span>
                                    <span>Unmatched grading standards</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#D6C5A0] mr-3 mt-1">
                                        •
                                    </span>
                                    <span>Ethical sourcing networks</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#D6C5A0] mr-3 mt-1">
                                        •
                                    </span>
                                    <span>Global gemological authority</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#D6C5A0] mr-3 mt-1">
                                        •
                                    </span>
                                    <span>
                                        Centuries of craftsmanship excellence
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <button
                            className={`mt-10 ${openSans.className} h-10 text-[#2E2B28] font-normal px-3 border-1 border-[#2E2B28] hover:bg-[#2E2B28] hover:text-[#FFFFFF] transition-all duration-300`}
                        >
                            EXPLORE OUR COLLECTION
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="flex items-center justify-center">
                        <Image
                            src={gem3}
                            alt="DONAI Apart"
                            width={600}
                            height={600}
                            className="h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default OurStory;
