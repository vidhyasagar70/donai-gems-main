'use client';
import Image from 'next/image';

export default function BannerSection() {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/bannerForGem.png" 
        alt="Banner background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      {/* Centered Text */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4">
          Gems Knowledge
        </h1>
      </div>
    </div>
  );
}