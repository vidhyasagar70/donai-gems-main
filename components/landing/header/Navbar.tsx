"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Mulish } from "next/font/google";
import Link from "next/link";
import CategoriesDropdown from "./CategoriesDropdown";
import GemstoneDropdown from "./GemstoneDropdown";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
    User,
    LogOut,
    MapPin,
    Phone,
    Mail,
    Facebook,
    X,
    Youtube,
    Pin,
    Instagram,
    ChevronDown,
    UserCircle,
    Settings,
    Users,
    FileText,
} from "lucide-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import { FaPinterest, FaXTwitter } from "react-icons/fa6";

const mulish = Mulish({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const Navbar = () => {
    const Router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, user, logout, loading, isAdmin } = useAuth();
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const currentScrollY =
                current *
                (document.documentElement.scrollHeight - window.innerHeight);

            if (currentScrollY < 50) {
                setVisible(true);
            } else {
                const direction = currentScrollY - lastScrollY;
                if (direction < 0) {
                    setVisible(true);
                } else if (direction > 0) {
                    setVisible(false);
                }
            }
            setLastScrollY(currentScrollY);
        }
    });

    // Only common navigation items for all users
    const baseNavBarItems = [
        { name: "HOME", path: "/" },
        { name: "ABOUT US", path: "/About" },
        { name: "GEMSTONE", path: "/gemstones" },
        { name: "FINE JEWELRY", path: "/jewelery" },
        { name: "GEM KNOWLEDGE", path: "/gemknowledge" },
        { name: "CONTACT US", path: "/Contact" },
    ];

    // User dropdown menu items (including admin items if admin)
    const userMenuItems = [
        // Only show Profile if user is not VIP
        ...(user?.isVip !== true
            ? [{ name: "Profile", path: "/profile", icon: UserCircle }]
            : []),
        ...(isAdmin
            ? [
                  { name: "Admin Panel", path: "/admin", icon: Settings },
                  { name: "Members", path: "/members", icon: Users },
                  { name: "Inquiries", path: "/quotations", icon: FileText },
              ]
            : []),
    ];

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
    const [showGemstoneDropdown, setShowGemstoneDropdown] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showAboutDropdown, setShowAboutDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("EN");

    const languages = [
        { code: "EN", name: "English" },
        { code: "FR", name: "Français" },
        { code: "NL", name: "Nederlands" },
        { code: "DE", name: "Deutsch" },
    ];

    const handleLanguageSelect = (languageCode: string) => {
        setSelectedLanguage(languageCode);
        setShowLanguageDropdown(false);
    };

    const handleUserMenuClick = (path: string) => {
        Router.push(path);
        setShowUserDropdown(false);
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: 0,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 1,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="bg-[#181818] sticky top-0 z-50 shadow-lg"
            >
                <div
                    className={` hidden lg:flex max-w-[1380px] mx-auto py-3 px-10  gap-60 lg:gap-10 justify-center items-center ${mulish.className}`}
                >
                    <div className="flex items-center space-x-5 text-sm text-gray-300">
                        <div className="flex items-center space-x-2 ">
                            <MapPin className="h-4 w-4 " />
                            <span>Pelikanstraat 62, Antwerpen, Belgium</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3 " />
                            <span>+32 3 233 4309</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3 " />
                            <span>info@donaigems.com</span>
                        </div>
                    </div>
                    <div className=" items-center space-x-4 text-sm hidden text-gray-300 ">
                        <div className="flex items-center space-x-2 ">
                            <Facebook className="h-4 w-4 " />
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaXTwitter className="h-4 w-4" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Youtube className="h-4 w-4 " />
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaPinterest className="h-4 w-4 " />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Instagram className="h-4 w-4 " />
                        </div>
                    </div>
                </div>

                <div className="w-full border-t border-[#C49A6C66]" />

                <div className="flex  max-w-[1380px] mx-auto flex-row items-center  justify-between lg:justify-between px-10 relative">
                    {/* Nav Links */}
                    <div
                        onMouseLeave={() => {
                            setShowCategoriesDropdown(false);
                            setShowGemstoneDropdown(false);
                        }}
                        className="relative hidden lg:block"
                    >
                        <ul className="hidden lg:flex gap-[20px] text-[12px]">
                            {baseNavBarItems.map((item) => {
                                if (item.name === "ABOUT US") {
                                    return (
                                        <div key={item.path}>
                                            <li
                                                key={item.path}
                                                className={`py-3 relative cursor-pointer ${
                                                    mulish.className
                                                } text-md ${
                                                    pathname === `${item.path}`
                                                        ? "text-[#D6C5A0]"
                                                        : "text-white hover:text-[#D6C5A0]"
                                                }`}
                                                style={{ fontWeight: 300 }}
                                                onClick={() => {
                                                    Router.push(`${item.path}`);
                                                }}
                                                onMouseEnter={() =>
                                                    setShowAboutDropdown(
                                                        !showAboutDropdown
                                                    )
                                                }
                                            >
                                                {item.name}
                                            </li>
                                        </div>
                                    );
                                }
                                return (
                                    <li
                                        key={item.path}
                                        className={`py-3 relative cursor-pointer ${
                                            mulish.className
                                        } text-md ${
                                            pathname === `${item.path}`
                                                ? "text-[#D6C5A0]"
                                                : "text-white hover:text-[#D6C5A0]"
                                        }`}
                                        style={{ fontWeight: 300 }}
                                        onMouseEnter={() => {
                                            if (item.name === "GEMSTONE") {
                                                setShowGemstoneDropdown(true);
                                                setShowCategoriesDropdown(
                                                    false
                                                );
                                            } else if (
                                                item.name === "FINE JEWELRY"
                                            ) {
                                                setShowCategoriesDropdown(true);
                                                setShowGemstoneDropdown(false);
                                            } else {
                                                setShowCategoriesDropdown(
                                                    false
                                                );
                                                setShowGemstoneDropdown(false);
                                            }
                                        }}
                                        onClick={() => {
                                            Router.push(`${item.path}`);
                                        }}
                                    >
                                        {item.name}
                                    </li>
                                );
                            })}
                        </ul>

                        <GemstoneDropdown
                            showGemstoneDropdown={showGemstoneDropdown}
                            setShowGemstoneDropdown={setShowGemstoneDropdown}
                        />
                    </div>

                    {/* Logo Section */}
                    <Link className="lg:-translate-x-23" href="/">
                        <Image
                            src="/logo/logo.png"
                            alt="Donai Gems Logo"
                            width={500}
                            height={400}
                            draggable={false}
                            priority
                            quality={100}
                            className="w-30 mt-3 lg:w-40 h-auto cursor-pointer"
                            onClick={() => Router.push("/")}
                        />
                    </Link>
                    {/* Profile and Logout */}
                    <div
                        className={`hidden lg:flex items-center gap-3 ${mulish.className} relative`}
                        onMouseLeave={() => setShowUserDropdown(false)}
                    >
                        {loading ? (
                            <div className="w-40 h-10 bg-transparent border-white border-1 rounded-md animate-pulse"></div>
                        ) : isAuthenticated ? (
                            <>
                                {/* User Dropdown Button */}
                                <div className="relative">
                                    <Button
                                        variant="outline"
                                        className={`text-md hover:border-primary text-white bg-transparent hover:text-primary hover:bg-transparent rounded-none cursor-pointer flex items-center gap-2 ${
                                            user?.isVip === true ? "" : ""
                                        }`}
                                        onMouseEnter={() =>
                                            setShowUserDropdown(true)
                                        }
                                    >
                                        <User className="h-4 w-4" />
                                        {user?.username}
                                        <ChevronDown className="h-3 w-3" />
                                    </Button>

                                    {/* User Dropdown Menu */}
                                    <AnimatePresence>
                                        {showUserDropdown && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: -10,
                                                    scale: 0.95,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -10,
                                                    scale: 0.95,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeOut",
                                                }}
                                                className="absolute top-full right-0 mt-2 w-48 py-2 bg-white shadow-[0px_20px_30px_0px_rgba(0,0,0,0.15)] rounded-lg border border-gray-100 z-50"
                                                onMouseEnter={() =>
                                                    setShowUserDropdown(true)
                                                }
                                                onMouseLeave={() =>
                                                    setShowUserDropdown(false)
                                                }
                                            >
                                                {userMenuItems.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D6C5A0] cursor-pointer transition-colors duration-200"
                                                            onClick={() =>
                                                                handleUserMenuClick(
                                                                    item.path
                                                                )
                                                            }
                                                        >
                                                            <item.icon className="h-4 w-4" />
                                                            {item.name}
                                                        </div>
                                                    )
                                                )}
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <div
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 cursor-pointer transition-colors duration-200"
                                                    onClick={logout}
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Logout
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button className="text-[12px] overflow-hidden  rounded-none bg-transparent border hover:border-primary hover:text-primary hover:bg-transparent cursor-pointer text-white relative">
                                        LOGIN
                                        {/* <span className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-60 bg-gradient-to-r from-transparent via-primary to-transparent animate-shine" /> */}
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        variant={"outline"}
                                        className="text-[12px] rounded-none bg-transparent border  hover:border-primary hover:text-primary hover:bg-transparent cursor-pointer text-white"
                                    >
                                        REGISTER
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger Logo */}
                    <div className="lg:hidden text-white flex gap-4">
                        <button onClick={() => setMenuOpen(!isMenuOpen)}>
                            <HiOutlineMenu size={30} />
                        </button>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <div
                    className={`fixed block lg:hidden  top-0 right-0 h-full w-[250px] bg-white z-50 transform transition-all duration-300 ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    {/* Close Button */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-base">Menu</h2>
                        <button onClick={() => setMenuOpen(false)}>
                            <HiOutlineX size={30} />
                        </button>
                    </div>

                    {/* Sidebar Links */}
                    <ul className="flex flex-col ml-5 gap-3 text-lg">
                        {baseNavBarItems.map((item) => (
                            <li
                                key={item.path}
                                onClick={() => Router.push(`${item.path}`)}
                                className={`py-3 relative cursor-pointer ${
                                    pathname === `${item.path}`
                                        ? "text-[#D6C5A0]"
                                        : "text-black hover:text-[#D6C5A0]"
                                }`}
                            >
                                {item.name}
                            </li>
                        ))}

                        {/* User Menu Items in Mobile */}
                        {isAuthenticated && (
                            <>
                                <div className="border-t border-gray-200 my-2"></div>
                                {userMenuItems.map((item) => (
                                    <li
                                        key={item.path}
                                        onClick={() => Router.push(item.path)}
                                        className={`py-3 relative cursor-pointer flex items-center gap-2 ${
                                            pathname === item.path
                                                ? "text-[#D6C5A0]"
                                                : "text-black hover:text-[#D6C5A0]"
                                        }`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </li>
                                ))}
                                <li
                                    onClick={logout}
                                    className="py-3 relative cursor-pointer flex items-center gap-2 text-black hover:text-red-500"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Navbar;