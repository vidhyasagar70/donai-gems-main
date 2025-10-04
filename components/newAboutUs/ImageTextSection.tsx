"use client";

import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { Playfair_Display, Jost } from "next/font/google";
import { Button } from "../ui/button";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

interface ImageTextSectionProps {
    title: string;
    subheading: string;
    description: string;
    bulletPoints?: string[];
    imageSrc: StaticImageData;
    imagePosition: "left" | "right";
    buttonText: string;
    buttonLink: string;
    imageShapeClass: string;
}

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
    title,
    subheading,
    description,
    bulletPoints,
    imageSrc,
    imagePosition,
    buttonText,
    buttonLink,
    imageShapeClass,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const maskTransform = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const imageTransform = useTransform(scrollYProgress, [0, 1], [-400, 0]);

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

    const ImageColumn = () => (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="relative h-96 lg:h-[500px]"
        >
            <motion.div
                style={{ y: maskTransform }}
                className="absolute inset-0 w-full h-full"
            >
                <div
                    className={`w-full h-full overflow-hidden ${imageShapeClass}`}
                >
                    <motion.div
                        style={{ y: imageTransform }}
                        className="relative w-full h-[150%]"
                    >
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1023px) 100vw, 50vw"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );

    const TextColumn = () => (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
        >
            <motion.h2
                variants={fadeInUp}
                className={`text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-4 ${playFair.className}`}
            >
                {title} <span className="block text-primary">{subheading}</span>
            </motion.h2>
            <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className={`text-[#606060] leading-relaxed mb-4 ${jost.className}`}
                style={{ fontWeight: 300 }}
            >
                {description}
            </motion.p>
            {bulletPoints && (
                <motion.ul
                    variants={fadeInUp}
                    transition={{ delay: 0.3 }}
                    className={`list-disc list-inside text-[#606060] space-y-2 my-6 ${jost.className}`}
                    style={{ fontWeight: 300 }}
                >
                    {bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </motion.ul>
            )}
            <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
                className="my-5 text-center lg:text-left"
            >
                <Link href={buttonLink} className="btn-main mt-2">
                    <Button className="rounded-none bg-primary hover:bg-primary text-white hover:shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] hover:text-white">
                        {buttonText}
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
    );

    return (
        <div ref={sectionRef} className="my-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {imagePosition === "left" ? (
                    <>
                        <ImageColumn />
                        <TextColumn />
                    </>
                ) : (
                    <>
                        <div className="lg:order-last">
                            <ImageColumn />
                        </div>
                        <div className="lg:order-first">
                            <TextColumn />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageTextSection;
