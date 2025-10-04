import Image from "next/image";
import React from "react";
import cert1 from "@/public/newHome/DiamondCertficates/AGL.jpg";
import cert2 from "@/public/newHome/DiamondCertficates/cert1.png";
import cert3 from "@/public/newHome/DiamondCertficates/cert2.png";
import cert4 from "@/public/newHome/DiamondCertficates/cert3.png";
import { Playfair_Display, Open_Sans, Jost } from "next/font/google";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, Variants } from "framer-motion";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const jost = Jost({
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
            duration: 0.9,
            ease: "easeIn",
        },
    }),
};

const certificateData = [
    {
        id: 1,
        image: cert1,
        title: "AGL-CERTIFICATE",
        description:
            "The American Gemological Laboratories (AGL) is a globally recognized authority in gemstone certification, renowned for its expertise in colored stone analysis. ",
        alt: "AGL Certificate",
    },
    {
        id: 2,
        image: cert2,
        title: "GRS-CERTIFICATE",
        description:
            "GRS (Gem Research Swisslab) specializes in origin determination of colored gemstones, providing detailed reports on treatment history and geographical origins.",
        alt: "GRS Certificate",
    },
    {
        id: 3,
        image: cert3,
        title: "GUBELIN-CERTIFICATE",
        description:
            "Gübelin Gem Lab is a prestigious Swiss institution known for its scientific rigor in gemstone analysis, combining cutting-edge technology with over 100 years of expertise.",
        alt: "GUBELIN Certificate",
    },
    {
        id: 4,
        image: cert4,
        title: "SSEF-CERTIFICATE",
        description:
            "SSEF (Swiss Gemmological Institute) provides world-renowned testing and certification services, emphasizing scientific excellence and independence in analyzing precious gems.",
        alt: "SSEF Certificate",
    },
];

const DiamondCertificates = () => {
    return (
        <div className="bg-[#181818] mt-5 lg:mt-30 p-8 rounded-md">
            <motion.div
                // custom={0.2}
                variants={fadeIn}
                className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between "
            >
                {/* Left Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 text-center md:text-left">
                    <h1 className={`${playfair.className} text-white text-3xl`}>
                        Certified by the{" "}
                        <span className="text-[#D6C5A0]">
                            World&apos;s Finest Gem Labs
                        </span>
                    </h1>
                    <p
                        className={`${jost.className} mt-6 text-neutral-400 text-base leading-7`}
                    >
                        Every gemstone is accompanied by certifications from
                        globally recognised laboratories, including SSEF, GRS,
                        Gübelin and AGL, ensuring authenticity and quality.
                    </p>
                    <p
                        className={`${jost.className} mt-4 text-neutral-400 text-base leading-7`}
                    >
                        Evaluated under rigorous industry standards in Antwerp,
                        the heart of the gem trade, our gems meet the highest
                        benchmarks of excellence.
                    </p>
                </div>

                {/* Right Carousel */}
                <div className="w-full md:w-1/2 relative flex items-center justify-center p-6">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-sm"
                    >
                        <CarouselContent>
                            {certificateData.map((certificate) => (
                                <CarouselItem key={certificate.id}>
                                    <div className="flex flex-col items-center justify-center text-center gap-3 text-white p-1">
                                        <div className="w-full aspect-square relative">
                                            <Image
                                                src={certificate.image}
                                                alt={certificate.alt}
                                                fill
                                                className="rounded-md object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h6
                                                className={`${playfair.className} text-lg text-[#D6C5A0]`}
                                            >
                                                {certificate.title}
                                            </h6>
                                            <span
                                                className={`${openSans.className} text-sm text-neutral-300`}
                                            >
                                                {certificate.description}
                                            </span>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute -left-8 bottom-1/2  bg-white/80 hover:bg-white text-black" />
                        <CarouselNext className="absolute -right-8 bottom-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black" />
                    </Carousel>
                </div>
            </motion.div>
        </div>
    );
};

export default DiamondCertificates;
