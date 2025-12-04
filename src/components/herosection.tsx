import { Button } from "@heroui/react";

export const HeroSection = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-pink-50 rounded-[35px] shadow-md">
      <div className="flex flex-col gap-4">
        <span className="text-sm text-gray-500">💫 GlowVera</span>
        <h1 className="text-3xl font-bold">Wujudkan Kilau Alami Kulit Impian Anda.</h1>
        <p className="text-gray-600">Rahasia kulit sehat, cerah, dan bercahaya ada di tangan Anda.<br></br> Mulai perjalanan kulit glowing Anda dengan GLOWVERA Brightening Serum</p>
        <Button className="bg-pink-600 text-white w-40">View All Products</Button>
      </div>
      <div>
        <img
          src="/image/GlowVera-BrightSerum.png" 
          alt="Headphone"
          className="w-80 h-80 object-contain rounded-md"
        />
      </div>
    </div>
  );
};
