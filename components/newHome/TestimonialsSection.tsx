"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Playfair_Display, Open_Sans } from "next/font/google";
import test1 from "@/app/assets/test1.jpg";
import test2 from "@/app/assets/test2.jpg";
import test3 from "@/app/assets/test3.jpg";
import BgImage from "@/public/newHome/Testimonial/Testimonial1.png";
import { motion, AnimatePresence } from "framer-motion";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const testimonials = [
    {
        quote: "DONAI turned my engagement ring into a timeless masterpiece. The sparkle is breathtaking, and the service was impeccable.",
        client: {
            name: "Sarah Williams",
            location: "New York, USA",
            image: test1,
        },
    },
    {
        quote: "I’ve never seen gems this pure and elegant. DONAI’s craftsmanship speaks for itself — truly world-class.",
        client: {
            name: "Rajiv Mehta",
            location: "Mumbai, India",
            image: test2,
        },
    },
    {
        quote: "From consultation to delivery, everything was seamless. I feel like I own a piece of heritage, not just jewelry.",
        client: {
            name: "Isabella Garcia",
            location: "London, UK",
            image: test3,
        },
    },
];

const TestimonialsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section
            className="testimonial-section relative w-full py-30 flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
                backgroundImage: `url(${BgImage.src})`,
            }}
        >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="  w-full max-w-lg lg:max-w-2xl p-8 md:p-10 rounded-lg bg-black/30 backdrop-blur-sm">
                <div className="testimonial-heading mb-8">
                    <h2
                        className={`${playFair.className} text-4xl md:text-5xl text-white`}
                    >
                        What Our Clients Say
                    </h2>
                    <p
                        className={`${openSans.className} text-white/80 mt-2 text-lg`}
                    >
                        Real stories from people who chose the brilliance of
                        DONAI.
                    </p>
                </div>

                <div className="testimonial-slider relative h-48">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-full"
                        >
                            <p
                                className={`font-serif text-white  text-base md:text-lg italic`}
                            >
                                "{activeTestimonial.quote}"
                            </p>
                            <div className=" flex items-center justify-center mt-6">
                                <Image
                                    src={activeTestimonial.client.image}
                                    alt={activeTestimonial.client.name}
                                    width={60}
                                    height={60}
                                    className="rounded-full object-cover"
                                />
                                <div className="ml-4">
                                    <h4
                                        className={`${playFair.className} text-white font-semibold text-lg`}
                                    >
                                        {activeTestimonial.client.name}
                                    </h4>
                                    <span
                                        className={`${openSans.className} text-white/70 text-sm`}
                                    >
                                        {activeTestimonial.client.location}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
