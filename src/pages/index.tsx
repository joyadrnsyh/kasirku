import DefaultLayout from "@/layouts/default";
import HeroSection from "@/components/herosection";
import ProductCard from "@/components/productcart";
import productService from "@/services/productService";
import { useEffect, useState } from "react";
import { addToast } from "@heroui/toast";
import { Button as HButton } from "@heroui/react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

const IDR_EXCHANGE_RATE = 15000;

export default function IndexPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Gagal memuat produk.");
        addToast({
          title: "Error ❌",
          description: "Gagal memuat daftar produk.",
          variant: "solid",
          color: "danger",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (title: string) => {
    addToast({
      title: "Keranjang 🛒",
      description: `Produk ${title} telah ditambahkan.`,
      variant: "flat",
      color: "success",
    });
  };

  const handleBuy = (title: string) => {
    addToast({
      title: "Pembelian Berhasil 🎉",
      description: `Produk ${title} telah diproses.`,
      variant: "flat",
      color: "success",
    });
  };

  const recommendedProducts = products.slice(0, 3);
  const specialOffers = products.slice(3, 6);

  const ProductCardSkeleton = () => (
    <div className="h-[360px] bg-neutral-200 rounded-none animate-pulse" />
  );

  const renderProductList = (list: Product[]) =>
    list.map((product) => (
      <ProductCard
        key={product.id}
        title={product.title}
        subtitle={product.category.name}
        imageSrc={product.images[0] || "/image/default.png"}
        price={Math.round(product.price * IDR_EXCHANGE_RATE)}
        rating={4.5}
      >
        <HButton
          variant="solid"
          color="default"
          className="flex-1 bg-black text-white rounded-none h-12 tracking-wide"
          onPress={() => handleAddToCart(product.title)}
        >
          ADD TO CART
        </HButton>

        <HButton
          variant="bordered"
          color="default"
          className="flex-1 border-black text-black rounded-none h-12 tracking-wide"
          onPress={() => handleBuy(product.title)}
        >
          BUY NOW
        </HButton>
      </ProductCard>
    ));

  return (
    <DefaultLayout>
      {/* HERO SECTION */}
      <section className="px-6 md:px-10 mt-10">
        <HeroSection />
      </section>

      {/* RECOMMENDED SECTION */}
      <section className="mt-28 px-6 md:px-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-14 tracking-tight">
          RECOMMENDED FOR YOU
        </h1>

        {error && (
          <p className="text-center text-red-500 font-medium mb-6">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : renderProductList(recommendedProducts)}
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="mt-32 px-6 md:px-10 mb-24">
        <h2 className="text-4xl font-bold text-center mb-14 tracking-tight">
          SPECIAL OFFERS
        </h2>

        {error && (
          <p className="text-center text-red-500 font-medium mb-6">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : specialOffers.length > 0 ? (
            renderProductList(specialOffers)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada penawaran spesial saat ini.
            </p>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
