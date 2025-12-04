interface ProductCardProps {
  title: string;
  subtitle?: string;
  image: string;
  rating?: number;
}

export const ProductCard = ({ title, subtitle, image, rating }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
      <img src={image} alt={title} className="w-32 h-32 object-contain mb-2" />
      <h3 className="font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      {rating && <span className="text-yellow-400 mt-1">⭐ {rating}</span>}
    </div>
  );
};
