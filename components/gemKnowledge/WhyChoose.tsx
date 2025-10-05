'use client';
import { Playfair_Display} from "next/font/google";

const playFair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
export default function DonaiDifference() {
  return (
    <section className="bg-[#A68A6A] px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-openSans text-white text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-medium">
           Why Choose Donai Gems for Your Gemstone Collection
          </p>
          <h2 className={`text-white text-4xl md:text-5xl lg:text-6xl font-normal leading-tight ${playFair.className}`}>
            Experience the Donai Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 lg:gap-y-16">
          {/* Exceptional Quality */}
          <div>
            <h3 className={`text-white text-xl md:text-2xl font-normal mb-4 ${playFair.className}`}>
              Exceptional Quality
            </h3>
            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
              Every gemstone is handpicked for brilliance, rarity, and integrity, ensuring that our clients receive nothing but the highest quality creations.
            </p>
          </div>

          {/* Master Craftsmanship */}
          <div>
            <h3 className={`text-white text-xl md:text-2xl font-normal mb-4 ${playFair.className}`}>
              Master Craftsmanship
            </h3>
            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
              Our skilled artisans combine traditional techniques with modern design to create jewelry that reflects artistry and authenticity.
            </p>
          </div>

          {/* Timeless Design */}
          <div>
            <h3 className={`text-white text-xl md:text-2xl font-normal mb-4 ${playFair.className}`}>
              Timeless Design
            </h3>
            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
              We craft pieces that transcend trends, blending elegance with sophistication to be cherished across generations.
            </p>
          </div>

          {/* Personalized Creations */}
          <div>
            <h3 className={`text-white text-xl md:text-2xl font-normal mb-4 ${playFair.className}`}>
              Personalized Creations
            </h3>
            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
              From bespoke jewels to unique statement pieces, we design jewelry tailored to your individual taste and story.
            </p>
          </div>

          
          <div>
            <h3 className={`text-white text-xl md:text-2xl font-normal mb-4 ${playFair.className}`}>
              Heritage & Legacy
            </h3>
            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
              Rooted in Antwerp's rich history of fine jewelry, our pieces carry the legacy of European craftsmanship to you.
            </p>
          </div>

          
          <div>
            <h3 className={`text-white text-xl md:text-2xl font-normal mb-4 ${playFair.className}`}>
              Passion & Integrity
            </h3>
            <p className="font-openSans text-white/90 text-sm md:text-base leading-relaxed font-light">
              We operate with a deep respect for nature's treasures, ensuring ethical sourcing and genuine care in every creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}