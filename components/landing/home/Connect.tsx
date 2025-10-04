import React from "react";
import { Open_Sans } from "next/font/google";
// import StarIcon from "../assets/star.png";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const Connect = () => {
    return (
        <div>
            {/* Form Section */}
            <div className="w-full bg-[#FAF8F2]">
                {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-840 left-240" />
        <Image src={StarIcon} alt="star" width={25} height={25} className="absolute top-870 left-70" />
        <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-955 left-70" />
        <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-900 left-240" />
        <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-1000 left-220" /> */}
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-30 py-20 text-center md:text-left mt-20">
                    <div>
                        <p
                            className={`${openSans.className} text-[#2E2B28B2] text-md`}
                        >
                            Location
                        </p>
                        <div
                            className={`${openSans.className} text-[#2E2B2880] text-sm mb-7`}
                        >
                            <p>DONAI GEMS</p>
                            <p>Pelikanstraat 62,</p>
                            <p>Diamantclub Van Antwerpen,</p>
                            <p>Office #1019–1020, Antwerpen, 2018,</p>
                            <p>Belgium</p>
                            <p>VAT: BE0705.917.993</p>
                        </div>
                        <p
                            className={`${openSans.className} text-[#2E2B28B2] text-md`}
                        >
                            Open Hours
                        </p>
                        <p
                            className={`${openSans.className} text-[#2E2B2880] text-sm mb-7`}
                        >
                            Monday to Saturday, 10:00 AM – 7:00 PM
                        </p>
                        {/* <p
                            className={`${openSans.className} text-[#2E2B28B2] text-md`}
                        >
                            Phone
                        </p>
                        <p
                            className={`${openSans.className} text-[#2E2B2880] text-sm mb-7`}
                        >
                            +32 (0)3 XXX XXXX
                        </p> */}
                        <p
                            className={`${openSans.className} text-[#2E2B28B2] text-md`}
                        >
                            Email
                        </p>
                        <p
                            className={`${openSans.className} text-[#2E2B2880] text-sm mb-20`}
                        >
                            info@donaigems.com
                        </p>
                    </div>

                    <div className="p-5 md:p-0">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border-0 border-b border-[#2E2B2880] focus:outline-none focus:border-black bg-transparent"
                        />
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border-0 border-b border-[#2E2B2880] focus:outline-none focus:border-black bg-transparent mt-7"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                className="w-full border-0 border-b border-[#2E2B2880] focus:outline-none focus:border-black bg-transparent mt-7"
                            />
                            <textarea
                                placeholder="Your Message"
                                className="w-full border-0 border-b border-[#2E2B2880] focus:outline-none focus:border-black bg-transparent mt-7 h-32 resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className={`${openSans.className} border rounded-sm text-[#2E2B28] px-8 py-2 mt-7 cursor-pointer hover:bg-[#2E2B28] hover:text-[#FFFFFF] transition-all duration-300`}
                        >
                            SEND
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Connect;
