"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus } from "next/font/google";
import bannerImage from "@/public/newAboutUs/banner3.jpg";

const marcellus = Marcellus({
    subsets: ["latin"],
    weight: ["400"],
});

interface Breadcrumb {
    name: string;
    path: string;
    active?: boolean;
}

interface BannerSectionProps {
    title: string;
    breadcrumbs: Breadcrumb[];
    children?: React.ReactNode;
}

const BannerSection: React.FC<BannerSectionProps> = ({
    title,
    breadcrumbs,
    children,
}) => {
    return (
        <section
            id="subheader"
            className="relative text-white py-23
        "
        >
            <Image
                src={bannerImage}
                className="object-cover"
                alt="Banner with various gemstones"
                fill
                quality={100}
                priority
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="container mx-auto relative ">
                <div className="flex justify-center">
                    <div className="w-full lg:w-10/12 text-center">
                        <h1
                            className={`text-4xl underline decoration-[2px]  underline-offset-2 decoration-primary md:text-5xl font-bold ${marcellus.className}`}
                        >
                            {title}
                        </h1>
                        {children && (
                            <p className=" text-gray-300 text-sm max-w-lg mx-auto m-4">
                                {children}
                            </p>
                        )}
                        <ul className="flex justify-center items-center gap-2 mt-4">
                            {breadcrumbs.map((crumb, index) => (
                                <li
                                    key={index}
                                    className={`flex items-center ${
                                        crumb.active
                                            ? "text-gray-300"
                                            : "text-white"
                                    }`}
                                >
                                    <Link
                                        href={crumb.path}
                                        className="hover:text-gray-300 transition-colors"
                                    >
                                        {crumb.name}
                                    </Link>
                                    {!crumb.active && (
                                        <span className="mx-2">/</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
