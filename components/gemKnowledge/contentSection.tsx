'use client';

import { Playfair_Display, Jost } from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

interface Section {
  title: string;
  content: string;
  image: string;
  align: 'left' | 'right';
}

const GemstoneShowcase = () => {
  const sections: Section[] = [
    {
      title: 'Emeralds in Belgium: Timeless Green Treasures',
      content:
        'Emeralds, celebrated for their rich green hues, have been treasured since ancient times as symbols of harmony, renewal, and prosperity. As members of the beryl family, emeralds rank among the worlds most iconic gemstones. At Donai Gems, we offer finely sourced emeralds in Belgium, handpicked for their brilliance, clarity, and rarity. These collectible green gemstones are perfect for bespoke jewellery, heirloom pieces, or sophisticated collector displays',
      image: '/images/Emerald.jpg',
      align: 'right'
    },
    {
      title: 'Rubies in Belgium: The King of Gems',
      content:
        'Rubies, with their fiery red tones, are prized as symbols of passion, protection, and vitality. Belonging to the corundum family, rubies are admired worldwide for their hardness, vivid color, and historical significance. At Donai Gems, we present a curated selection of premium rubies in Belgium, showcasing authentic red gemstones ideal for fine jewellery, heirloom-quality rings, and investment collections.',
      image: '/images/Ruby.jpg',
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
        'Semi-precious gemstones provide endless variety and creativity for collectors and jewellery enthusiasts. While traditionally more abundant than the "Big Four," stones like amethyst, citrine, garnet, and topaz rival precious gems in beauty and character. At Donai Gems, we source high-quality semi-precious stones in Belgium, celebrating their color, patterns, and durability. Each piece in our rare semi-precious collection is perfect for custom jewellery or unique heirloom-quality creations.',
      image: '/images/semi-precious.jpg',
      align: 'left'
    }
  ];

  return (
    <div className="min-h-screen">
      {sections.map((section, index) => (
        <div
          key={index}
          className="min-h-screen flex items-center bg-gradient-to-r from-orange-50 to-gray-100"
        >
          <div className="w-full">
            <div
              className={`flex flex-col ${
                section.align === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-stretch lg:items-center min-h-screen`}
            >
              {/* Content Side */}
              <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
                <div className="max-w-xl w-full">
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal leading-tight mb-4 sm:mb-5 md:mb-6 text-gray-800 ${playFair.className}`}>
                    {section.title}
                  </h2>
                  <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-7 md:mb-8 text-gray-800 font-normal ${jost.className}`}>
                    {section.content}
                  </p>
                  <button 
                    className={`text-white px-6 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 font-medium uppercase text-xs sm:text-sm hover:opacity-90 hover:shadow-2xl w-full sm:w-auto ${jost.className}`}
                    style={{ background: '#aa8765' }}
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-screen">
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