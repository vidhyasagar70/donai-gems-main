import React from "react";
import Image from "next/image";
import gemApart from "@/app/assets/gemApart.jpg";
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

const DianoApart = () => {
    return (
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between gap-10 bg-[#FAF8F2] mt-20 lg:mt-30">
            {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-238 left-5" />
        <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-330 left-150" /> */}

            {/* Image Section */}
            <div className="flex items-center justify-center">
                <Image
                    src={gemApart}
                    alt="DONAI Apart"
                    width={500}
                    height={500}
                    className="h-full object-cover"
                />
            </div>

            {/* Info Section */}
            <div className="flex flex-col py-15 mt-15 max-w-xl mx-auto items-center lg:items-start">
                <h1
                    className={`${playFair.className} text-5xl text-[#2E2B28] text-center lg:text-left lg:whitespace-nowrap`}
                    style={{ fontWeight: 400 }}
                >
                    What Sets DONAI Apart
                </h1>
                <div
                    className={`mt-10 ${openSans.className} font-light text-md text-[#2E2B28CC] text-center lg:text-left lg:text-xl`}
                >
                    <p>
                        A century-old legacy of curating the rarest gemstones
                        with uncompromising integrity.
                    </p>
                </div>

                <button
                    className={`mt-10 ${openSans.className} h-10 text-[#2E2B28] border border-[#2E2B28] px-3 hover:bg-[#2E2B28] hover:text-[#FFFFFF] transition-all duration-300`}
                >
                    BOOK A MEETING
                </button>
            </div>
        </div>
    );
};

export default DianoApart;
