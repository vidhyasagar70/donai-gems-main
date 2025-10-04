'use client';

import { useEffect, useRef, useState } from 'react';

interface Section {
  title: string;
  content: string;
  image: string;
  align: 'left' | 'right';
}

const GemstoneShowcase = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => {
                if (prev.includes(index)) return prev;
                return [...prev, index];
              });
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const sections: Section[] = [
    {
      title: 'Introduction to Emeralds',
      content:
        'Emeralds, with their captivating green hue, have been cherished since ancient times for their beauty and rarity. Revered as one of the "Big Four" gemstones alongside diamond, ruby, and sapphire, their rich color and lustrous allure make them a favorite for fine jewelry. Explore the beauty and heritage of emeralds, offering only the finest stones for your collection.',
      image: '/images/emerald.jpg',
      align: 'right'
    },
    {
      title: 'Introduction to Rubies',
      content:
        'Rubies, the vibrant red gemstones of the corundum family, are celebrated for their brilliance and regal allure. Known for their durability and vivid hues, rubies have symbolized wealth, power, and passion for centuries. Our collection showcases their fiery brilliance and rich history for jewelry enthusiasts and collectors.',
      image: '/images/ruby.jpg',
      align: 'left'
    },
    {
      title: 'Introduction to Sapphires',
      content:
        'Sapphires, renowned for their stunning colors and exceptional durability, are among the most cherished gemstones. A prized variety of corundum, sapphires are second only to diamonds in hardness. While blue sapphires are iconic, they come in nearly every color of the rainbow. Explore our curated collection that celebrates their versatility and elegance.',
      image: '/images/sapphire.jpg',
      align: 'right'
    },
    {
      title: 'Introduction to Semi-Precious Gems',
      content:
        'Our semi-precious gem collection offers affordable yet stunning alternatives to traditional precious stones. From blue zircon to citrine and amethyst, these gems bring color and character to unique jewelry. At Divine Gems, we celebrate the diversity and beauty of semi-precious gems with high-quality specimens that inspire creativity.',
      image: '/images/semi-precious.jpg',
      align: 'left'
    }
  ];

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        
        .title-font {
          font-family: 'Playfair Display', serif;
        }
        
        .body-font {
          font-family: 'Jost', sans-serif;
        }
      `}</style>
      
      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className="h-[85vh] flex items-center transition-all duration-1000"
          style={{
            background: 'linear-gradient(to right, #fff5ec 0%, #f3f3f5 100%)'
          }}
        >
          <div className="w-full h-full flex">
            <div
              className={`w-full h-full flex ${
                section.align === 'left' ? 'flex-row-reverse' : 'flex-row'
              } items-center`}
            >
              {/* Content Side */}
              <div
                className={`w-1/2 h-full flex items-center px-12 lg:px-16 xl:px-24 transition-all duration-1000 ${
                  visibleSections.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : section.align === 'left'
                    ? 'opacity-0 -translate-x-20'
                    : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="max-w-xl">
                  <h2 className="title-font text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight mb-6 text-gray-800">
                    {section.title}
                  </h2>
                  <p className="body-font text-base lg:text-lg leading-relaxed mb-8 text-[#606060]" style={{ fontWeight: 300 }}>
                    {section.content}
                  </p>
                  <button
                    className="body-font text-white px-8 py-3 rounded-none transition-all duration-300 font-medium uppercase text-sm hover:opacity-90 hover:shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                    style={{
                      background: '#aa8765'
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div
                className={`w-1/2 h-full transition-all duration-1000 ${
                  visibleSections.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : section.align === 'left'
                    ? 'opacity-0 translate-x-20'
                    : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GemstoneShowcase;