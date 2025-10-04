"use client";
import React from "react";
import { Playfair_Display, Mulish, Jost } from "next/font/google";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import gem8 from "@/app/assets/blue.jpg";
import gem22 from "@/public/newHome/green-bracelet2.jpg"; // Added a second image for the layout
import Link from "next/link";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const jost = Jost({
    subsets: ["latin"],
    weight: ["400"],
});

const mulish = Mulish({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const BuildOnCraft = () => {
    return (
        <section className="bg-transparent py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            className="relative"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.div
                                custom={0}
                                variants={scaleIn}
                                className="relative rounded-lg"
                            >
                                <Image
                                    src={gem8}
                                    alt="Blue Gemstone"
                                    width={500}
                                    height={500}
                                    className="w-full h-auto pr-12 pb-12 rounded-lg"
                                />
                            </motion.div>
                            <motion.div
                                custom={0.2}
                                variants={scaleIn}
                                className="absolute w-1/2 right-0 bottom-0 "
                            >
                                <Image
                                    src={gem22}
                                    alt="Crafting Process"
                                    width={250}
                                    height={250}
                                    className="w-full h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Info Section */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            className="pl-lg-3"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div
                                custom={0.2}
                                variants={fadeIn}
                                className={`text-lg font-semibold mb-2 ${jost.className}`}
                            >
                                Welcome to Donai
                            </motion.div>
                            <motion.h2
                                custom={0.4}
                                variants={fadeIn}
                                className={`text-4xl md:text-5xl text-[#2E2B28] ${playFair.className}`}
                            >
                                Built on Craft.{" "}
                                <span
                                    style={{
                                        background:
                                            "linear-gradient(to right, #D6BFA6, #8B6C4A)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Driven by Clarity.
                                </span>
                            </motion.h2>
                            <motion.p
                                custom={0.6}
                                variants={fadeIn}
                                className={`mt-6 text-md text-[#2E2B28CC] font-light leading-relaxed ${jost.className}`}
                            >
                                At DONAI, we&apos;ve spent over two decades in
                                the global gem trade, choosing not just
                                beautiful stones, but the Precious, most
                                valuable ones that pass through Antwerp&apos;s
                                elite networks.
                                <br />
                                <br />
                                Every gem is ethically sourced, certified, and
                                meticulously graded — built to serve legacy
                                jewellers and high-end connoisseurs.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuildOnCraft;
