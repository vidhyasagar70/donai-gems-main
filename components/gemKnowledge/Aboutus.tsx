'use client';
import { Playfair_Display, Jost } from "next/font/google";
import { motion } from "framer-motion";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const AboutUsSection = () => {
  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-r from-[#fff5ec] to-[#fff5ec]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-20 xl:gap-24">
          
          <div className="w-full lg:w-5/12 relative mb-16 sm:mb-20 md:mb-24 lg:mb-0">
            {/* Main Image - Animated */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src="/images/about2.jpg"
                  alt="Colorful gemstones"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute bottom-[-40px] right-[-40px] sm:bottom-[-50px] sm:right-[-50px] md:bottom-[-60px] md:right-[-60px] lg:right-[-80px] w-[45%] sm:w-[48%] md:w-[50%] aspect-square"
            >
              <div className="relative w-full h-full overflow-hidden shadow-2xl rounded-sm">
                <img
                  src="/images/about.png"
                  alt="Sapphire ring"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
          
          {/* Right Side - Content */}
          <div className="w-full lg:w-7/12 mt-0 lg:mt-0">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <p className={`text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-gray-600 uppercase ${playFair.className}`}>
                  About Us
                </p>
              </motion.div>
             
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal leading-tight text-gray-900 ${playFair.className}`}>
                  Crafting Timeless Elegance With Passion
                </h2>
              </motion.div>
             
              <div className={`space-y-4 sm:space-y-5 text-[#606060] leading-relaxed font-normal ${jost.className}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <p className="text-sm sm:text-base md:text-base">
                    At Donai Gems, we are more than a jewellery house — we are artisans of beauty, passion, and timeless craftsmanship. Nestled in the historic heart of Belgium, the world's gemstone capital, we dedicate ourselves to sourcing the rarest and most brilliant treasures, offering clients access to Premium Gems in Belgium that embody elegance and distinction.
                  </p>
                </motion.div>
               
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <p className="text-sm sm:text-base md:text-base">
                    Each gemstone — from radiant rubies and sapphires to exquisite emeralds and timeless diamonds — is carefully chosen for its integrity, rarity, and brilliance. Our commitment ensures that every client receives creations of unmatched quality and authenticity. With every piece, our master jewellers unite European craftsmanship with modern sophistication, transforming nature's wonders into extraordinary works of art.
                  </p>
                </motion.div>
               
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <p className="text-sm sm:text-base md:text-base">
                    Our philosophy is rooted in crafting jewellery that transcends fleeting trends, celebrating individuality, love, and legacy. Every creation, whether a bespoke ring or a statement necklace, is designed to be more than adornment — it is destined to become a cherished heirloom, carrying stories across generations.
                  </p>
                </motion.div>
               
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <p className="text-sm sm:text-base md:text-base">
                    At Donai Gems, artistry, authenticity, and heritage converge to deliver luxury gemstones in Belgium that inspire, captivate, and endure.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;