import React from "react";
import { Playfair_Display, Mulish } from "next/font/google";
import Image from "next/image";
// import StarIcon from "../assets/star.png";
import gem8 from "@/app/assets/blue.jpg";
import Link from "next/link";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const mulish = Mulish({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const BuildOnCraft = () => {
    return (
        <div className=" bg-[#FAF8F2] py-5 ">
            {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-560 left-10" />
      <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-590 left-160" />
      <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-650 left-60" /> */}
            {/* Info Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 ">
                <div className="max-w-xl mx-auto mt-20 text-center md:text-left">
                    <h1
                        className={`${playFair.className} text-[#2E2B28] text-5xl text-center md:text-left`}
                        style={{
                            background:
                                "linear-gradient(to right, #D6BFA6, #8B6C4A)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Built on Craft. Driven by Clarity.
                    </h1>
                    <p
                        className={`${mulish.className} text-xl text-[#2E2B28CC] font-light mt-8 mb-8 text-center md:text-left`}
                    >
                        At DONAI, we&apos;ve spent over two decades in the
                        global gem trade, choosing not just beautiful stones,
                        but the Precious, most valuable ones that pass through
                        Antwerp&apos;s elite networks.
                    </p>
                    <p
                        className={`${mulish.className} text-xl text-[#2E2B28CC] font-light mt-8 mb-8 text-center md:text-left`}
                    >
                        Every gem is ethically sourced, certified, and
                        meticulously graded — built to serve legacy jewellers
                        and high-end connoisseurs.
                    </p>

                    <Link href={"/contact"}>
                        <button className="text-[#2E2B28] border cursor-pointer border-[#2E2B28] px-5 py-1 mb-10 hover:bg-[#2E2B28] hover:text-white">
                            ENQUIRY
                        </button>
                    </Link>
                    <Link href={"/contact"}>
                        <button className="text-white cursor-pointer bg-[#C49A6CCC] border border-[#C49A6CCC] px-5 py-1 mb-10 ml-5">
                            BOOK AN APPOINTMENT
                        </button>
                    </Link>
                </div>

                {/* Image Section */}
                <div className="flex items-center justify-center">
                    <Image
                        src={gem8}
                        alt="Commitment Gem"
                        width={500}
                        height={500}
                        className="h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default BuildOnCraft;
