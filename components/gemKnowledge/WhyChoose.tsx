'use client';
export default function DonaiDifference() {
  return (
    <section className="bg-[#A68A6A] px-6 py-16 md:py-24">
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
        {/* Header */}
        <div className="text-center mb-16">
          <p className="body-font text-white text-sm md:text-base tracking-[0.2em] uppercase mb-4" style={{ fontWeight: 500 }}>
            WHY CHOOSE US
          </p>
          <h2 className="title-font text-white text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
            Experience the Donai Difference
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 lg:gap-y-16">
          {/* Exceptional Quality */}
          <div>
            <h3 className="title-font text-white text-xl md:text-2xl font-normal mb-4">
              Exceptional Quality
            </h3>
            <p className="body-font text-white/90 text-sm md:text-base leading-relaxed" style={{ fontWeight: 300 }}>
              Every gemstone is handpicked for brilliance, rarity, and integrity, ensuring that our clients receive nothing but the highest quality creations.
            </p>
          </div>

          {/* Master Craftsmanship */}
          <div>
            <h3 className="title-font text-white text-xl md:text-2xl font-normal mb-4">
              Master Craftsmanship
            </h3>
            <p className="body-font text-white/90 text-sm md:text-base leading-relaxed" style={{ fontWeight: 300 }}>
              Our skilled artisans combine traditional techniques with modern design to create jewelry that reflects artistry and authenticity.
            </p>
          </div>

          {/* Timeless Design */}
          <div>
            <h3 className="title-font text-white text-xl md:text-2xl font-normal mb-4">
              Timeless Design
            </h3>
            <p className="body-font text-white/90 text-sm md:text-base leading-relaxed" style={{ fontWeight: 300 }}>
              We craft pieces that transcend trends, blending elegance with sophistication to be cherished across generations.
            </p>
          </div>

          {/* Personalized Creations */}
          <div>
            <h3 className="title-font text-white text-xl md:text-2xl font-normal mb-4">
              Personalized Creations
            </h3>
            <p className="body-font text-white/90 text-sm md:text-base leading-relaxed" style={{ fontWeight: 300 }}>
              From bespoke jewels to unique statement pieces, we design jewelry tailored to your individual taste and story.
            </p>
          </div>

          {/* Heritage & Legacy */}
          <div>
            <h3 className="title-font text-white text-xl md:text-2xl font-normal mb-4">
              Heritage & Legacy
            </h3>
            <p className="body-font text-white/90 text-sm md:text-base leading-relaxed" style={{ fontWeight: 300 }}>
              Rooted in Antwerp's rich history of fine jewelry, our pieces carry the legacy of European craftsmanship to you.
            </p>
          </div>

          {/* Passion & Integrity */}
          <div>
            <h3 className="title-font text-white text-xl md:text-2xl font-normal mb-4">
              Passion & Integrity
            </h3>
            <p className="body-font text-white/90 text-sm md:text-base leading-relaxed" style={{ fontWeight: 300 }}>
              We operate with a deep respect for nature's treasures, ensuring ethical sourcing and genuine care in every creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}