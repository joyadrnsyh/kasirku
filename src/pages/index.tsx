import DefaultLayout from "@/layouts/default";
import HeroSection from "@/components/herosection"; 
import ProductCard from "@/components/productcart";
import productService from "@/services/productService";
import { useEffect, useState } from "react";
import { addToast } from "@heroui/toast"; // <-- Ini adalah notifikasi yang Anda gunakan
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
            console.error("Error fetching products:", err);
            setError("Gagal memuat produk. Silakan coba lagi nanti.");
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

  // Handler untuk Tambah ke Keranjang
  const handleAddToCart = (title: string) => {
    // Tampilkan notifikasi (toast) saat tombol ditekan
    addToast({
      title: "Keranjang 🛒",
      description: `Produk **${title}** telah ditambahkan ke keranjang.`,
      variant: "flat",
      color: "success",
      promise: new Promise((resolve) => setTimeout(resolve, 3000))
    });
    // Di sini Anda dapat menambahkan logika state keranjang (jika ada)
  };

  // Handler untuk Beli Langsung
  const handleBuy = (title: string) => {
    // Tampilkan notifikasi (toast) saat tombol ditekan
    addToast({
      title: "Pembelian Berhasil 🎉",
      description: `Pesanan produk **${title}** berhasil diproses.`,
      variant: "flat",
      color: "success",
    });
    // Di sini Anda dapat menambahkan logika proses checkout (jika ada)
  };

  const recommendedProducts = products.slice(0, 3);
  const specialOffers = products.slice(3, 6);

  // Komponen Loading Skeleton (diasumsikan sudah ada dari perbaikan sebelumnya)
  const ProductCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse h-[400px]">
        <div className="w-full h-[60%] bg-gray-200"></div>
        <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="flex gap-2 mt-4">
                <div className="h-10 w-1/2 bg-gray-300 rounded-lg"></div>
                <div className="h-10 w-1/2 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    </div>
  );
  
  const renderProductList = (productsToRender: Product[]) => (
    <>
      {productsToRender.map((product, index) => (
        <ProductCard
          key={`product-${product.id}-${index}`} 
          title={product.title}
          subtitle={product.category.name}
          imageSrc={product.images[0] || "/image/default.png"}
          price={Math.round(product.price * IDR_EXCHANGE_RATE)} 
          rating={4.5} // Contoh rating agar Bintang terlihat
        >
          {/* PERBAIKAN: Tombol HButton dari Heroui biasanya sudah memiliki efek tekan (press state) bawaan */}
          <HButton 
            variant="solid" 
            color="secondary" // Menggunakan warna secondary untuk Cart
            onPress={() => handleAddToCart(product.title)}
            className="flex-1" // Memastikan tombol mengisi ruang yang tersedia
          >
            Cart
          </HButton>
          <HButton 
            variant="bordered" 
            color="primary" // Menggunakan warna primary untuk Beli
            onPress={() => handleBuy(product.title)}
            className="flex-1"
          >
            Beli
          </HButton>
        </ProductCard>
      ))}
    </>
  );

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 mx-auto mt-8 px-4 md:px-10">
        <div className="md:w-full w-full">
          <HeroSection />
        </div>
      </section>

      {/* Recommended Products */}
      <section className="mx-auto mt-16 px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Recommended Products ✨
        </h1>

        {error && (
            <p className="col-span-full text-center text-red-600 font-medium">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))
          ) : (
            renderProductList(recommendedProducts)
          )}

          {/* Produk statis tambahan */}
          <ProductCard
            key="static-speaker-product"
            title="Sequoia Pro Speakers"
            subtitle="Experience 360 sound"
            imageSrc="/image/GlowVeraProduct.png"
            price={1250000}
            rating={5}
          >
            <HButton 
              variant="solid" 
              color="secondary" 
              onPress={() => handleAddToCart("Sequoia Pro Speakers")}
              className="flex-1"
            >
              Cart
            </HButton>
            <HButton 
              variant="bordered" 
              color="primary" 
              onPress={() => handleBuy("Sequoia Pro Speakers")}
              className="flex-1"
            >
              Beli
            </HButton>
          </ProductCard>
        </div>
      </section>


      {/* Penawaran Spesial */}
      <section className="mx-auto mt-16 px-4 md:px-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Penawaran Spesial 💰</h2>
        
        {error && (
            <p className="col-span-full text-center text-red-600 font-medium">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={`special-${index}`} />
            ))
          ) : (
            specialOffers.length > 0 ? (
                renderProductList(specialOffers)
            ) : (
                <p className="col-span-full text-center">Tidak ada penawaran spesial saat ini.</p>
            )
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}