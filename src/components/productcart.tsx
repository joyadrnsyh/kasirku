import React from "react";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  price: number;
  rating: number;
  onAddToCart?: () => void;
  onBuy?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  subtitle,
  imageSrc,
  rating,
  price,
  onAddToCart,
  onBuy,
}) => {
  const safeImage = imageSrc || "/image/default-fallback.png";

  const renderRating = (rate: number) => (
    <div className="flex items-center gap-1 mt-1 opacity-80">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={`w-4 h-4 ${
            idx < Math.floor(rate) ? "text-black fill-black" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs ml-1 text-gray-600">({rate.toFixed(1)})</span>
    </div>
  );

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden bg-white shadow-sm 
        hover:shadow-md transition-all duration-300 flex flex-col border border-gray-200"
    >
      {/* IMAGE */}
      <div className="w-full h-[340px] overflow-hidden bg-gray-100">
        <img
          src={safeImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/image/default-fallback.png";
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
            {title}
          </h2>

          <p className="text-gray-500 text-sm mt-1 tracking-wide">{subtitle}</p>

          {/* RATING */}
          {rating > 0 && rating <= 5 ? (
            renderRating(rating)
          ) : (
            <div className="h-5 mt-1"></div>
          )}

          {/* PRICE */}
          <p className="text-xl font-semibold text-gray-800 mt-3">
            Rp {Math.round(price).toLocaleString("id-ID")}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex gap-2">
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="w-full bg-black text-white py-2 rounded-md text-sm tracking-wide hover:bg-gray-900 transition"
            >
              Add to Cart
            </button>
          )}

          {onBuy && (
            <button
              onClick={onBuy}
              className="w-full border border-black text-black py-2 rounded-md text-sm tracking-wide hover:bg-gray-100 transition"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
