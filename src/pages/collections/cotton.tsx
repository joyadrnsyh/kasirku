import DefaultLayout from "@/layouts/default";
import ProductCard from "@/components/productcart";
import productService from "@/services/productService";
import { useEffect, useState, useContext } from "react";
import { addToast } from "@heroui/toast";
import { CartContext } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string; image: string; slug: string };
  images: string[];
}

const IDR_EXCHANGE_RATE = 15000;

export default function CollectionCottonPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getAllProducts();
        // Artificial filter for this collection
        setProducts(data.slice(20, 30));
      } catch (err) {
        setError("Gagal memuat produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: Math.round(product.price * IDR_EXCHANGE_RATE),
      images: product.images,
    });
    addToast({
      title: "Keranjang 🛒",
      description: `Produk ${product.title} telah ditambahkan.`,
      variant: "flat",
      color: "success",
    });
  };

  const handleBuy = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: Math.round(product.price * IDR_EXCHANGE_RATE),
      images: product.images,
    });
    navigate("/checkout");
  };

  const ProductCardSkeleton = () => (
    <div className="h-[450px] bg-neutral-200 rounded-xl animate-pulse" />
  );

  return (
    <DefaultLayout title="Koleksi | Premium Cotton">
      <section className="px-6 md:px-10 mt-10 mb-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Premium Cotton
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Rasakan kenyamanan tak tertandingi dengan koleksi bahan katun
            pilihan kami.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 font-medium mb-6">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  subtitle={product.category.name}
                  imageSrc={product.images[0] || "/image/default.png"}
                  price={Math.round(product.price * IDR_EXCHANGE_RATE)}
                  rating={4.5} // Hardcoded rating
                  onAddToCart={() => handleAddToCart(product)}
                  onBuy={() => handleBuy(product)}
                />
              ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
