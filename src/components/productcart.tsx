import React from "react";
import { Star } from "lucide-react";

interface ProductCardProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  rating?: number;
  price?: number;
  onBuy?: () => void;
  children?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  imageSrc,
  rating = 0,
  price,
  onBuy,
  children,
}) => {
  const renderRating = (rate: number) => (
    <div className="flex items-center gap-1 mt-1 opacity-80">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={`w-4 h-4 ${
            idx < Math.floor(rate)
              ? "text-black fill-black"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs ml-1 text-gray-600">
        ({rate.toFixed(1)})
      </span>
    </div>
  );

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-white shadow-sm 
      hover:shadow-md transition-all duration-300 flex flex-col border border-gray-200">

      {/* IMAGE */}
      <div className="w-full h-[340px] overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
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

          {subtitle && (
            <p className="text-gray-500 text-sm mt-1 tracking-wide">
              {subtitle}
            </p>
          )}

          {/* RATING */}
          {(rating > 0 && rating <= 5) ? (
            renderRating(rating)
          ) : (
            <div className="h-5 mt-1"></div>
          )}

          {/* PRICE */}
          {price !== undefined && (
            <p className="text-xl font-semibold text-gray-800 mt-3">
              Rp {Math.round(price).toLocaleString("id-ID")}
            </p>
          )}
        </div>

        {/* BUTTON AREA */}
        <div className="mt-4">
          {children ? (
            <div className="flex gap-2">{children}</div>
          ) : onBuy ? (
            <button
              onClick={onBuy}
              className="w-full bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-all"
            >
              Beli Sekarang
            </button>
          ) : (
            <div className="h-10"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
