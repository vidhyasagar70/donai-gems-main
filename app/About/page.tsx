"use client";
import React from "react";
import BannerSection from "@/components/newAboutUs/BannerSection";
import ImageTextSection from "@/components/newAboutUs/ImageTextSection";
import { ReactLenis, useLenis } from "lenis/react";

import aboutImage1 from "@/public/newHome/blu-gem-blue-bg.jpg";
import aboutImage2 from "@/public/newHome/Antwerp.jpg";
import aboutImage3 from "@/public/newAboutUs/redGemOnBLueBg.jpg";
import SetUsApartSection from "@/components/newAboutUs/SetUsApartSection";

const Page = () => {
    const lenis = useLenis((lenis) => {
        // called every scroll
        console.log(lenis);
    });
    return (
        <>
            <ReactLenis root />
            <div>
                <BannerSection
                    title="About Us"
                    breadcrumbs={[
                        { name: "Home", path: "/" },
                        { name: "About Us", path: "/About", active: true },
                    ]}
                />
                <section className="relative max-w-5xl mx-auto px-6 py-15">
                    <ImageTextSection
                        title="Our Legacy"
                        subheading="is in Every Gem"
                        description="Founded in 2018, DONAI stands as one of Antwerp's premier gemstone suppliers, trusted by jewellers, collectors, and connoisseurs across the globe. But our story didn't begin there. With over two decades of experience in the gem industry since 2001, our foundation is built on generations of knowledge, discipline, and precision. Today, we're not just another gem dealer. We are a global source of certified, investment-grade gemstones — each handpicked for brilliance, rarity, and value."
                        imageSrc={aboutImage1}
                        imagePosition="left"
                        buttonText="Book an Appointment"
                        buttonLink="#"
                        imageShapeClass="rounded-t-full"
                    />
                    <ImageTextSection
                        title="The Diamond Capital"
                        subheading="of the World"
                        description="Our roots run deep in Antwerp, the historical heart of the global diamond and gemstone trade. Located in the prestigious Diamond Street, we operate inside a legacy market trusted for:"
                        bulletPoints={[
                            "Unmatched grading standards",
                            "Ethical sourcing networks",
                            "Global gemological authority",
                            "Centuries of craftsmanship excellence",
                        ]}
                        imageSrc={aboutImage2}
                        imagePosition="right"
                        buttonText="Book an Appointment"
                        buttonLink="#"
                        imageShapeClass="rounded-b-full"
                    />
                    <ImageTextSection
                        title="What We"
                        subheading="Truly Do"
                        description="At DONAI, gemstones are our identity. We specialise in natural, premium-grade gems sourced from around the world and evaluated under the strictest international labs. We are known for:"
                        bulletPoints={[
                            "Loose Gemstones: Rubies, Sapphires, Emeralds & more",
                            "Certified Inventory: SSEF, GRS, GUBELIN, AGL",
                            "We are rare top-quality precious stone dealers, dedicated to finding and sourcing only the highest quality precious stones such as Rubies, Sapphires, and Emeralds. Our focus is solely on providing the very best in top-quality colored precious stones.",
                        ]}
                        imageSrc={aboutImage3}
                        imagePosition="left"
                        buttonText="Book an Appointment"
                        buttonLink="#"
                        imageShapeClass="rounded-t-full"
                    />
                </section>
                <SetUsApartSection />
            </div>
        </>
    );
};

export default Page;
