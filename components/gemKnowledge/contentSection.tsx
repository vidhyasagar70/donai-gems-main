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
      title: 'Emeralds in Belgium: Timeless Green Treasures',
      content:
        'Emeralds, celebrated for their rich green hues, have been treasured since ancient times as symbols of harmony, renewal, and prosperity. As members of the beryl family, emeralds rank among the world’s most iconic gemstones. At Donai Gems, we offer finely sourced emeralds in Belgium, handpicked for their brilliance, clarity, and rarity. These collectible green gemstones are perfect for bespoke jewellery, heirloom pieces, or sophisticated collector displays',
      image: '/images/emerald.jpg',
      align: 'right'
    },
    {
      title: 'Rubies in Belgium: The King of Gems',
      content:
        'Rubies, with their fiery red tones, are prized as symbols of passion, protection, and vitality. Belonging to the corundum family, rubies are admired worldwide for their hardness, vivid color, and historical significance. At Donai Gems, we present a curated selection of premium rubies in Belgium, showcasing authentic red gemstones ideal for fine jewellery, heirloom-quality rings, and investment collections.',
      image: '/images/ruby.jpg',
      align: 'left'
    },
    {
      title: 'Sapphires in Belgium: Elegance in Every Hue',
      content:
        'Sapphires, famous for their exceptional durability and stunning spectrum of colors, are among the most sought-after premium gemstones in Belgium. Beyond the classic deep blue, sapphires appear in pink, yellow, and even rare green varieties. These artisan-crafted gemstones blend timeless elegance with European craftsmanship, making them a favourite for bespoke necklaces, rings, and collectible jewellery.',
      image: '/images/sapphire.jpg',
      align: 'right'
    },
    {
      title: 'Semi-Precious Gems in Belgium: Diversity and Beauty',
      content:
        'Semi-precious gemstones provide endless variety and creativity for collectors and jewellery enthusiasts. While traditionally more abundant than the “Big Four,” stones like amethyst, citrine, garnet, and topaz rival precious gems in beauty and character. At Donai Gems, we source high-quality semi-precious stones in Belgium, celebrating their color, patterns, and durability. Each piece in our rare semi-precious collection is perfect for custom jewellery or unique heirloom-quality creations.',
      image: '/images/semi-precious.jpg',
      align: 'left'
    }
  ];

  return (
    <div className="min-h-screen">
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
                  <h2 className="font-playfair text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight mb-6 text-gray-800">
                    {section.title}
                  </h2>
                  <p className="font-openSans text-base lg:text-lg leading-relaxed mb-8 text-[#606060] font-light">
                    {section.content}
                  </p>
                  <button
                    className="font-openSans text-white px-8 py-3 rounded-none transition-all duration-300 font-medium uppercase text-sm hover:opacity-90 hover:shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
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