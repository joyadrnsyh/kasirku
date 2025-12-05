// HeroSection.tsx (Fashion Version)
import React from 'react';
import { Button } from '@heroui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="flex justify-between items-center h-[535px] bg-white rounded-2xl shadow-xl relative overflow-hidden gap-16 px-24">
      
      {/* BACKGROUND FASHION TONE */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-white to-stone-100/60"></div>
      
      {/* TEXT CONTENT */}
      <div className="z-10 w-full">
        <p className="text-stone-500 font-medium mb-1 font-poppins tracking-wide">
          👕 Premium Fashion Wear
        </p>

        <h1 className="text-6xl font-extrabold leading-tight mb-4 text-stone-800">
          Elevate Your Style<br />With Confidence.
        </h1>

        {/* FEATURE HIGHLIGHT */}
        <div className="flex items-center gap-4 mb-8 mt-6">
          <span className="text-7xl font-light text-stone-300">01</span>
          <div>
            <h3 className="font-semibold text-lg text-stone-700">
              Premium Fabric Quality
            </h3>
            <p className="text-stone-600 max-w-xs">
              Crafted with breathable, soft, and durable materials.
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <Button 
          className="h-14 px-8 text-white bg-stone-800 hover:bg-stone-900 transition-colors rounded-xl shadow-md"
          endContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
              viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
              className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" 
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          }
        >
          Shop Collection
        </Button>
      </div>

    </div>
  );
};

export default HeroSection;
