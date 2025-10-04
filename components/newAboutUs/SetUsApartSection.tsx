"use client";

import React from "react";
import Image from "next/image";
import { Playfair_Display, Inter, Marcellus, Jost } from "next/font/google";

import about1 from "@/public/newHome/yellow-gem-.jpg";
import about2 from "@/public/newHome/purple-gem-blue-bg.jpg";
import about3 from "@/public/newHome/blue-heart-gem.jpg";
import about4 from "@/public/newHome/blue-gem-on-cushion.jpeg";
import centerImage from "@/public/setusabout-Senter.jpg";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const marcellus = Marcellus({
    subsets: ["latin"],
    weight: ["400"],
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const features = [
    {
        title: "SIGNATURE SHOWCASE",
        description:
            "A Closer Look at Perfection Experience the brilliance of our jewels through ultra-clear, high-definition showcases. See every facet, every detail — as if holding it in your hands.",
        image: about1,
    },
    {
        title: "PRIVATE ACCESS",
        description:
            "An Invitation to Exclusivity Our most rare and coveted pieces are available only by private appointment. Discover limited-edition collections reserved for an elite circle of collectors and connoisseurs.",
        image: about2,
    },
    {
        title: "DESIGNER CHOICE",
        description:
            "The Jeweller's Jeweller Our gemstones and creations are handpicked by the world’s top designers and luxury houses — a trusted source for uncompromising quality and timeless inspiration.",
        image: about3,
    },
    {
        title: "CUSTOM MADE",
        description:
            "Crafted Just for You Every piece is tailored to your vision — from selecting the perfect stone to bringing your bespoke design to life. DONAI turns your desires into enduring heirlooms.",
        image: about4,
    },
];

const FeatureCard = ({
    title,
    description,
    image,
}: {
    title: string;
    description: string;
    image: any;
}) => (
    <div className="relative  group overflow-hidden rounded-[10px]">
        <div className="absolute w-full h-full top-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 "></div>
        <Image
            src={image}
            alt={title}
            className="w-full aspect-square h-auto object-cover group-hover:scale-125 transition-transform duration-500"
        />
        <div className="absolute w-full h-full bottom-0 flex flex-col items-center justify-center p-4    bg-black/10 backdrop-blur-sm  opacity-0 scale-[3] group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out ">
            <h4
                className={`mb-2 text-2xl text-black font-bold text-center ${marcellus.className}`}
            >
                {title}
            </h4>
            <p
                className={`text-sm text-black text-center font-light text-wrap w-full ${jost.className}`}
            >
                {description}
            </p>
        </div>
    </div>
);

const SetUsApartSection = () => {
    return (
        <section className="py-16 ">
            <div className="container mx-auto px-4 relative ">
                <div className="text-center lg:w-8/12 lg:mx-auto mb-12">
                    <div
                        className={`text-lg text-black mb-3 ${jost.className}`}
                    >
                        A Signature Experience, Beyond the Ordinary
                    </div>
                    <h2
                        className={`text-4xl md:text-5xl text-[#2E2B28] ${playFair.className}`}
                    >
                        What Sets{" "}
                        <span className="text-[#C49A6C]">Us Apart</span>
                    </h2>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1  lg:grid-cols-3 gap-3 items-center justify-center">
                        {/* Left Side 2 Boxes */}
                        <div className="flex flex-col  justify-center items-stretch gap-3">
                            <FeatureCard
                                title={features[0].title}
                                description={features[0].description}
                                image={features[0].image}
                            />
                            <FeatureCard
                                title={features[1].title}
                                description={features[1].description}
                                image={features[1].image}
                            />
                        </div>

                        {/* Center Image */}
                        <div className="text-center h-full  hidden lg:block">
                            <Image
                                src={centerImage}
                                className="w-full h-full aspect-square object-cover rounded-[10px]"
                                alt="Main Showcase"
                            />
                        </div>

                        {/* Right Side 2 Boxes */}
                        <div className="flex flex-col justify-center items-stretch gap-3">
                            <FeatureCard
                                title={features[2].title}
                                description={features[2].description}
                                image={features[2].image}
                            />
                            <FeatureCard
                                title={features[3].title}
                                description={features[3].description}
                                image={features[3].image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SetUsApartSection;
