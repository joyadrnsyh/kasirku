import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productcart";
import productService from "@/services/productService";
import { addToast } from "@heroui/toast";

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

export default function ClothesProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => {
        const filtered = data.filter(
          (p: Product) => p.category?.name === "Clothes"
        );
        setProducts(filtered);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
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

  return (
    <DefaultLayout>
      {loading ? (
        <p className="text-center mt-10 text-lg font-medium">Loading...</p>
      ) : (
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Produk Kategori Clothes
          </h1>

          {products.length === 0 ? (
            <p className="text-center text-default-500">
              Tidak ada produk Clothes.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  subtitle={product.category.name}
                  imageSrc={
                    product.images?.[0] || "/image/default-fallback.png"
                  }
                  rating={4}
                  price={Math.round(product.price * 15000)}
                  onAddToCart={() => handleAddToCart(product.title)}
                  onBuy={() => handleBuy(product.title)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </DefaultLayout>
  );
}
