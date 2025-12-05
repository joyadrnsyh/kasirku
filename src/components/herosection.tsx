// HeroSection.tsx — Japanese Minimalist with Carousel
import React from "react";
import { Button } from "@heroui/button";
import HeroImageCarousel from "@/components/heroimagecarousel";

const heroImages = [
  "/image/japanese-fashion-1.jpeg",
  "/image/japanese-fashion-2.jpeg",
  "/image/japanese-fashion-3.jpeg",
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between 
      bg-white border border-neutral-200 rounded-2xl 
      px-12 md:px-20 py-16 gap-12 shadow-sm">

      {/* LEFT TEXT */}
      <div className="max-w-xl">
        <p className="text-neutral-500 tracking-[0.25em] text-xs uppercase mb-4">
          新しいコレクション — New Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-neutral-900">
          Simple.
          <br />Clean.
          <br /><span className="font-bold">Essential Wear.</span>
        </h1>

        <p className="mt-6 text-neutral-600 text-lg leading-relaxed max-w-md">
          Pakaian esensial harian yang mengutamakan kenyamanan, fungsi, dan desain minimalis.
        </p>

        <Button
          className="mt-8 h-12 px-10 rounded-none 
            bg-red-600 text-white hover:bg-red-700 
            transition-all font-medium tracking-wide"
        >
          Shop Now
        </Button>
      </div>

      {/* CAROUSEL IMAGE */}
      <div className="w-full md:w-[45%]">
        <HeroImageCarousel images={heroImages} />
      </div>
    </section>
  );
};

export default HeroSection;
