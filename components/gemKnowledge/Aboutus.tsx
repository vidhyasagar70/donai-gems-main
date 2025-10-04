'use client';

import { useEffect, useRef, useState } from 'react';

const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen py-16 px-8 lg:px-16"
      style={{ background: 'linear-gradient(to right, #fff5ec 0%, #fff5ec 100%)' }}
    >
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        
        .title-font {
          font-family: 'Playfair Display', serif;
        }
        
        .body-font {
          font-family: 'Jost', sans-serif;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Side - Images */}
          <div className="w-full lg:w-5/12 relative mb-24 lg:mb-0">
            {/* Main Image - Gemstones */}
            <div 
              className={`relative w-full transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-20'
              }`}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src="/images/about2.jpg"
                  alt="Colorful gemstones"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Overlapping Image - Ring */}
            <div 
              className={`absolute bottom-[-60px] right-[-60px] lg:right-[-80px] w-[50%] aspect-square transition-all duration-1000 delay-300 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="relative w-full h-full overflow-hidden shadow-2xl">
                <img
                  src="/images/about.png"
                  alt="Sapphire ring"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div 
            className={`w-full lg:w-7/12 mt-8 lg:mt-0 transition-all duration-1000 delay-500 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
          >
            <div className="space-y-6">
              <p className="body-font text-sm font-semibold tracking-[0.2em] text-gray-600 uppercase">
                About Us
              </p>
              
              <h2 className="title-font text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight text-gray-900">
                Crafting Timeless Elegance With Passion
              </h2>
              
              <div className="body-font space-y-5 text-[#606060] leading-relaxed" style={{ fontWeight: 300 }}>
                <p className="text-sm lg:text-base">
                  At Donai Gems, we are more than a jewelry house — we are artisans of beauty, 
                  passion, and timeless craftsmanship. Located in the historic heart of Antwerp, 
                  Belgium, the world's gemstone capital, we dedicate ourselves to sourcing the 
                  rarest and most brilliant gemstones. Each stone is carefully selected for its quality, 
                  integrity, and uniqueness, ensuring our clients receive nothing but exceptional 
                  creations. With every gemstone, our master jewelers blend traditional European 
                  craftsmanship with modern sophistication, transforming nature's treasures into 
                  extraordinary works of art.
                </p>
                
                <p className="text-sm lg:text-base">
                  Our philosophy is rooted in creating jewelry that transcends trends, celebrating 
                  individuality, love, and legacy. Every piece, from radiant necklaces to bespoke 
                  rings, is designed to be more than adornment — it is destined to become a 
                  cherished heirloom, carrying stories that last generations. At Donai Gems, 
                  elegance, artistry, and authenticity come together to deliver jewelry that truly 
                  captivates and inspires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;