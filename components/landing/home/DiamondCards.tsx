import Image from "next/image";
import React, { useState } from "react";
import cert1 from "@/public/certificates/giaCert.jpg";
import cert2 from "@/app/assets/grsCert.jpg";
import cert3 from "@/app/assets/gublinCert.jpeg";
import cert4 from "@/app/assets/ssefCert.jpg";
import { Playfair_Display, Open_Sans, Jost } from "next/font/google";

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

const certificateData = [
    {
        id: 1,
        image: cert1,
        title: "GIA-CERTIFICATE",
        description:
            "When buying a gem, its grading is a key focus. The grading certificate serves as its identity, proving quality and authenticity.",
        alt: "GIA Certificate",
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

const DiamondCards = () => {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? certificateData.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === certificateData.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="bg-[#181818] mt-5 lg:mt-30 p-8 rounded-md">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between ">
                {/* Left Content */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
                    <h1
                        className={`${playfair.className} text-primary text-3xl`}
                    >
                        <span className="text-white">Certified by the</span>{" "}
                        World&apos;s Finest Gem Labs
                    </h1>
                    <p
                        className={`${jost.className} mt-6 text-neutral-400 text-base leading-7`}
                    >
                        Every gemstone is accompanied by certifications from
                        globally recognised laboratories, including GIA, SSEF,
                        GRS, HRD, and Gübelin, ensuring authenticity and
                        quality.
                    </p>
                    <p
                        className={`${jost.className} mt-4 text-neutral-400 C] text-base leading-7`}
                    >
                        Evaluated under rigorous industry standards in Antwerp,
                        the heart of the gem trade, our gems meet the highest
                        benchmarks of excellence.
                    </p>
                </div>

                {/* Right Carousel */}
                <div className="w-full md:w-1/2 relative flex items-center justify-center">
                    <div className="w-full bg-transparent rounded-xl p-6 text-center shadow-md transition-all duration-500 ease-in-out">
                        <Image
                            src={certificateData[current].image}
                            alt={certificateData[current].alt}
                            width={300}
                            height={200}
                            className="mx-auto object-fit mb-4"
                        />
                        <h2
                            className={`${playfair.className} text-lg text-[#8B6C4A] mb-2`}
                        >
                            {certificateData[current].title}
                        </h2>
                        <p
                            className={`${openSans.className} text-sm text-[#2E2B28CC] mb-4`}
                        >
                            {certificateData[current].description}
                        </p>
                        <button className="border border-[#2E2B28] text-sm px-4 py-1 hover:bg-[#2E2B28] hover:text-white transition duration-300">
                            UNDERSTAND GEM QUALITY
                        </button>
                    </div>

                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                    >
                        <Image
                            src="Arrow1.svg"
                            alt="Left Arrow"
                            width={20}
                            height={20}
                        />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                    >
                        <Image
                            src="Arrow2.svg"
                            alt="Left Arrow"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiamondCards;
