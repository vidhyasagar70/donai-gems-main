"use client";
import React, { JSX, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true); // Start as visible
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const currentScrollY =
                current *
                (document.documentElement.scrollHeight - window.innerHeight);

            // Always show at the very top
            if (currentScrollY < 50) {
                setVisible(true);
            } else {
                // Show/hide based on scroll direction
                const direction = currentScrollY - lastScrollY;

                if (direction < 0) {
                    // Scrolling up
                    setVisible(true);
                } else if (direction > 0) {
                    // Scrolling down
                    setVisible(false);
                }
            }

            setLastScrollY(currentScrollY);
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: 0,
                }}
                animate={{
                    y: visible ? 0 : -60,
                    opacity: visible ? 1 : 1,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className={cn(
                    "flex max-w-full fixed top-0 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 h-20 items-center justify-center space-x-4",
                    className
                )}
            >
                {navItems.map((navItem: any, idx: number) => (
                    <a
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                        )}
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="hidden sm:block text-sm">
                            {navItem.name}
                        </span>
                    </a>
                ))}
                <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
                    <span>Login</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};
