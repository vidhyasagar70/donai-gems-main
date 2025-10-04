import React from "react";
import Image from "next/image";
import InstagramImage from "@/app/assets/instagram.png";
import { Open_Sans } from "next/font/google";
import { Link } from "lucide-react";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const InstagramSection = () => {
    return (
        <div className="max-w-7xl mx-auto p-10 mt-40">
            <div className="flex flex-col md:flex-row justify-around max-w-4xl mx-auto items-center">
                <div className="md:w-100">
                    <h1
                        className="md:text-5xl text-3xl font-normal font-['Playfair_Display'] "
                        style={{
                            background:
                                "linear-gradient(to right, #54330C, #FFDCBB)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontFamily: "Playfair Display",
                        }}
                    >
                        Witness Our Process, One Gem at a Time
                    </h1>
                    <p
                        className={`mt-5 ${openSans.className} text-lg font-light`}
                    >
                        Go behind the scenes — watch how gems are selected,
                        graded, and even transformed into bespoke pieces.
                    </p>
                    <p
                        className={`mt-5 ${openSans.className} text-lg font-normal`}
                    >
                        Follow our story on Instagram
                    </p>
                    <a
                        href="https://www.instagram.com/donaicollection/"
                        className="my-5 inline-flex justify-center items-center rounded-md relative overflow-hidden"
                        style={{
                            background:
                                "linear-gradient(to right, #590098, #FDD946)",
                            padding: "2px",
                        }}
                    >
                        <div className="bg-white px-5 py-2 rounded-sm w-full h-full flex items-center justify-center">
                            <span
                                className="text-base font-normal font-['Open_Sans']"
                                style={{
                                    background:
                                        "linear-gradient(to right, #590098, #FDD946)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                VIEW OUR INSTAGRAM
                            </span>
                        </div>
                    </a>
                </div>
                <div>
                    <Image
                        src={InstagramImage}
                        alt={"InstagramImage"}
                        width={700}
                        height={496}
                        className=" object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
};

export default InstagramSection;
