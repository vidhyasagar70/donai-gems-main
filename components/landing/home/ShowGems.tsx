import React from "react";
import { Open_Sans, Marcellus } from "next/font/google";
import Image from "next/image";
import gem21 from "@/app/assets/gem21.jpg";
import gem22 from "@/public/newHome/multipleEmeralds2.jpg";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});
const marcellus = Marcellus({
    subsets: ["latin"],
    weight: ["400"],
});

const Gems = [
    {
        src: gem21,
        alt: "GEM 4",
        name: "The Tourmaline Renaissance",
    },
    {
        src: gem22,
        alt: "GEM 5",
        name: "Emeralds Reimagined",
    },
];

const ShowGems = () => {
    return (
        <div className="max-w-4xl mx-auto my-10 w-full">
            {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-395 left-30" />
        <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-400 right-30" /> */}
            {/* <Image src={StarIcon} alt="star" width={25} height={25} className="absolute top-510 right-155" /> */}
            <div className="flex flex-col md:flex-row items-center justify-center">
                {Gems.map((gem, index) => (
                    <div key={index} className="w-1/2 px-5 group">
                        <div className=" relative overflow-hidden rounded-md">
                            <Image
                                src={gem.src}
                                alt={gem.alt}
                                width={300}
                                height={300}
                                className="w-full  object-cover aspect-[6/5] transition-transform duration-700 ease-in-out group-hover:scale-110"
                            />
                            <p
                                className={`absolute bottom-10  left-10 font-playfair text-white mt-5 text-[22px] font-medium ${marcellus.className}`}
                            >
                                {gem.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowGems;
