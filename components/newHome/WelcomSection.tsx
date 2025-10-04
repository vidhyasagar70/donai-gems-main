"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { Playfair_Display, Inter, Jost } from "next/font/google";
import firstImage from "@/public/newHome/Red-Ring-Hand.jpg";
import SecondImage from "@/public/newHome/red-ring-sunlight.jpg";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const jost = Jost({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const WelcomeSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax transforms for different scroll speeds
    const maskTransform = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const imageTransform = useTransform(scrollYProgress, [0, 1], [-400, 0]);

    // Animation variants
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section ref={sectionRef} className="relative py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Left Image with Parallax */}
                    <div className="hidden lg:block">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                            transition={{ delay: 0.7 }}
                            className="relative h-96 "
                        >
                            {/* Shape Mask */}
                            <motion.div
                                data-scroll
                                style={{ y: maskTransform }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <div className="w-full h-full  rounded-t-full overflow-hidden">
                                    {/* Image with different parallax speed */}
                                    <motion.div
                                        style={{ y: imageTransform }}
                                        className=" transition-all ease-linear relative w-full h-[170%]  -top-4"
                                    >
                                        <Image
                                            src={firstImage} // Update with your actual image path
                                            alt="Precious Gem 1"
                                            fill
                                            quality={100}
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 0vw, 33vw"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Center Content */}
                    <div className="text-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={scaleIn}
                        >
                            <motion.div variants={fadeInUp} className="mb-6">
                                <div
                                    className={`text-md md:text-xl tracking-wider text-black mb-4 ${jost.className}`}
                                    style={{ fontWeight: 400 }}
                                >
                                    WELCOME TO DONAI
                                </div>
                                <h2
                                    className={`text-3xl md:text-4xl lg:text-5xl font-normal leading-tight ${playFair.className}`}
                                >
                                    The World's Most{" "}
                                    <span className="block text-primary">
                                        Precious Gems at DONAI
                                    </span>
                                </h2>
                            </motion.div>

                            <motion.p
                                variants={fadeInUp}
                                transition={{ delay: 0.2 }}
                                className={`text-[#606060] font- leading-relaxed max-w-lg mx-auto ${jost.className}`}
                                style={{ fontWeight: 300 }}
                            >
                                Welcome to Antwerp's premier source for
                                high-grade natural gemstones — trusted by global
                                jewellers, designers, and collectors. Our core
                                lies in precision-selected gems, showcasing an
                                exquisite inventory of top-quality color
                                precious stones.
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Right Image with Parallax */}
                    <div className="hidden lg:block">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                            transition={{ delay: 0.3 }}
                            className="relative h-96 "
                        >
                            {/* Shape Mask */}
                            <motion.div
                                style={{ y: maskTransform }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <div className="w-full h-full  rounded-t-full overflow-hidden">
                                    {/* Image with different parallax speed */}
                                    <motion.div
                                        style={{ y: imageTransform }}
                                        className="relative transition-all ease-linear w-full h-[170%] top-20"
                                    >
                                        <Image
                                            src={SecondImage} // Update with your actual image path
                                            alt="Precious Gem 2"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 0vw, 33vw"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Spacer */}
                <div className="h-20"></div>
            </div>
        </section>
    );
};

export default WelcomeSection;
