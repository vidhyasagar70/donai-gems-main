"use client";

import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
// import StarIcon from "../assets/star.png";
import { Playfair_Display, Inter } from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        id: 1,
        question: "Can I order a custom-designed piece?",
        answer: "Based in Belgium, Powered Globally Our local team handles your needs directly, supported by trusted offshore experts for efficient delivery.",
    },
    {
        id: 2,
        question: "Do you ship internationally and securely?",
        answer: "Yes, we offer global shipping with full tracking and insurance.",
    },
    {
        id: 3,
        question: "Are the gemstones certified and natural?",
        answer: "All gemstones we use are ethically sourced, certified, and 100% natural.",
    },
    {
        id: 4,
        question: "How long does a custom order take to deliver?",
        answer: "Custom orders typically take 3–6 weeks depending on design complexity.",
    },
    {
        id: 5,
        question: "Can I request a private collection preview?",
        answer: "Yes, we can arrange private appointments for viewing exclusive collections.",
    },
    {
        id: 6,
        question: "Can I order a custom-designed piece?",
        answer: "Based in Belgium, Powered Globally Our local team handles your needs directly, supported by trusted offshore experts for efficient delivery.",
    },
];

const FAQSection = () => {
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setActiveId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="relative w-full bg-white py-20 px-4 md:px-24 max-w-7xl mx-auto md:mb-5">
            {/* <Image src={StarIcon} alt="star" width={20} height={20} className="absolute top-20 right-50" />
      <Image src={StarIcon} alt="star" width={18} height={18} className="absolute bottom-10 left-70" /> */}
            <h2
                className={`text-5xl text-center text-[#333] mb-12 ${playFair.className}`}
                style={{
                    background: "linear-gradient(to right, #54330C, #FFDCBB)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Frequently Asked Questions
            </h2>
            <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${inter.className}`}
            >
                {faqs.map((faq) => {
                    const isActive = faq.id === activeId;
                    return (
                        <div
                            key={faq.id}
                            className={`transition-all duration-300 p-6 rounded-xl border border-gray-200 shadow-sm cursor-pointer h-full hover:shadow-md ${
                                isActive ? "bg-[#FAF8F2]" : "bg-white"
                            }`}
                            onClick={() => toggleFAQ(faq.id)}
                        >
                            <div className="flex justify-between items-center">
                                <h3
                                    className={`text-base md:text-lg font-normal text-[#2E2B28B3] ${
                                        isActive
                                            ? "text-[#2E2B28]"
                                            : "text-[#2E2B28B3]"
                                    }`}
                                >
                                    {faq.question}
                                </h3>
                                <div className="text-gray-500">
                                    {isActive ? (
                                        <FaTimes size={14} />
                                    ) : (
                                        <FaPlus size={14} />
                                    )}
                                </div>
                            </div>
                            {isActive && (
                                <p className="mt-4 text-md font-light text-[#2E2B2880]">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQSection;
