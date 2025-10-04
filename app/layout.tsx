import type { Metadata } from "next";
import {
    Geist,
    Geist_Mono,
    Playfair_Display,
    Open_Sans,
} from "next/font/google";
import {} from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Navbar from "../components/landing/header/Navbar";
import FooterSection from "@/components/newHome/FooterSection";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
    variable: "--font-openSans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "DONAI Gems - Belgium's Premium & Certified Gemstones Online",
    description:
        "Discover DONAI Gems, Belgium's trusted dealer of premium, certified gemstones. Premium rubies, emeralds, sapphires & rare gems for jewelers in Belgium.",
    alternates: {
        canonical: "https://www.donaigems.com",
    },
    keywords:
        "natural gemstones, certified gems, rubies, emeralds, sapphires, custom jewelry, gemstone dealer, IGI certified, precious stones",
    authors: [{ name: "DONAI Gems" }],
    creator: "DONAI Gems",
    publisher: "DONAI Gems",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "DONAI Gems",
        description: "Authentic gemstones and jewelry from DONAI Gems.",
        url: "https://www.donaigems.com",
        siteName: "DONAI Gems",
        images: [
            {
                url: "/og-image.png",
                width: 500,
                height: 459,
                alt: "DONAI Gems - Premium Natural Gemstones",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DONAI Gems - Premium Natural Gemstones",
        description:
            "Discover the world's finest certified gemstones from Antwerp's Diamond Street",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`m-0 p-0  ${openSans.variable} ${playfair.variable} antialiased`}
            >
                <AuthProvider>
                    <Navbar />
                    {children}

                    <FooterSection />
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
