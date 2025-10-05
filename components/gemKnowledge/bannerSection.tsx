'use client';
import Image from 'next/image';
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function BannerSection() {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      <Image
        src="/images/bannerForGem.png" 
        alt="Banner background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      {/* Centered Text with Animation */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4 ${playFair.className}`}>
            Gems Knowledge
          </h1>
        </motion.div>
      </div>
    </div>
  );
}