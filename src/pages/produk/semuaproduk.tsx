import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productcart";
import productService from "@/services/productService";

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

export default function SemuaProduk() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleBuy = (title: string) => {
    alert(`Anda membeli produk: ${title}`);
  };

  return (
    <DefaultLayout>
      {loading ? (
        <p className="text-center mt-10 text-lg font-medium">Loading...</p>
      ) : (
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Semua Produk</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                subtitle={product.category.name}
                imageSrc={product.images[0]}
                rating={0}
                price={Math.round(product.price * 15000)}
                onBuy={() => handleBuy(product.title)}
              />
            ))}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
