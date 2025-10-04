// components/Popup.tsx
"use client";

import React from "react";
import Image from "next/image";
import popupBg from "@/app/assets/popup-bg.png";
import popupMain from "@/app/assets/popup-main.svg";
import { HiX } from "react-icons/hi";
import { Link } from "lucide-react";

interface PopupProps {
    onClose: () => void; // Add an onClose prop
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center">
                {/* Popup Container */}
                <div className="relative w-[732px] shrink h-[797px] max-w-[90vw] max-h-[90vh]">
                    {/* Background Image */}
                    <Image
                        src={popupBg}
                        alt="Popup Background"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        {/* Close Button */}
                        <button
                            onClick={onClose} // Use the onClose prop
                            className="absolute top-4 right-4 w-8 h-8 bg-transparent rounded-full flex items-center justify-center border-2 border-gray-700"
                        >
                            <HiX className="w-5 h-5 text-gray-700" />
                        </button>

                        <Image
                            src={popupMain}
                            alt="Popup Main"
                            className="w-3/5 h-2/3"
                        />
                        <div
                            className={`font-semibold font-['Playfair_Display'] text-7xl p-3 text-[#54330C] mb-2`}
                            style={{
                                background:
                                    "linear-gradient(to right, #FFDCBB, #54330C)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            15% Off
                        </div>
                        <div className="text-center m-5 justify-start text-black text-2xl font-normal font-['Open_Sans']">
                            IN STORE PURCHASE
                        </div>

                        <Link
                            className="px-14 cursor-pointer m-3 py-5 rounded-md shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)] outline-[1.20px] outline-offset-[-1.20px] outline-black inline-flex justify-center items-center gap-2.5"
                            href="/categories/all-jewelry"
                        >
                            <div className="justify-start text-black text-2xl font-normal font-['Open_Sans']">
                                SHOP SALE
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;
