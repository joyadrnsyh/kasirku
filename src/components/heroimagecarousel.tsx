import React, { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
}

const HeroImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500); // 3.5 detik
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[380px] md:h-[460px] rounded-xl overflow-hidden bg-neutral-100">

      {/* IMAGES STACKED */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 
            ${index === current ? "opacity-100" : "opacity-0"}
          `}
          alt=""
        />
      ))}

      {/* MINIMAL DOT INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all
              ${
                current === i
                  ? "bg-neutral-900 w-4"
                  : "bg-neutral-400/50"
              }
            `}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroImageCarousel;
