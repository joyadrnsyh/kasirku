import DefaultLayout from "@/layouts/default";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/productcart";
import productService from "@/services/productService";
import { Button as HButton } from "@heroui/react";
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

export default function SemuaProduk() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Search & Filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // ↕ Sorting
  const [sort, setSort] = useState("default");

  // Ambil semua produk
  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
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

  // Ambil kategori unik
  const categories = useMemo(() => {
    const catSet = new Set(products.map((p) => p.category.name));
    return ["all", ...Array.from(catSet)];
  }, [products]);

  // Filter + Search + Sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search
    if (search.trim() !== "") {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter kategori
    if (category !== "all") {
      list = list.filter((p) => p.category.name === category);
    }

    // Sorting
    if (sort === "price_low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [products, search, category, sort]);

  // Skeleton simple style Uniqlo
  const Skeleton = () => (
    <div className="animate-pulse border border-neutral-300 bg-white rounded-xl h-[330px]">
      <div className="bg-neutral-200 h-44 rounded-t-xl"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <DefaultLayout title="Semua Produk — yourBaju.id">
      <div className="container mx-auto px-4 py-10">
        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-center tracking-tight mb-10">
          Semua Produk
        </h1>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-neutral-300 px-4 py-2 rounded-md w-full md:w-1/3
              focus:outline-none focus:ring-1 focus:ring-black"
          />

          <div className="flex gap-3">
            {/* Dropdown Kategori */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-neutral-300 px-3 py-2 rounded-md 
                focus:outline-none focus:ring-1 focus:ring-black"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Semua Kategori" : cat}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-neutral-300 px-3 py-2 rounded-md 
                focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="default">Urutkan</option>
              <option value="price_low">Harga: Termurah</option>
              <option value="price_high">Harga: Termahal</option>
              <option value="az">Nama: A → Z</option>
              <option value="za">Nama: Z → A</option>
            </select>
          </div>
        </div>

        {/* LIST PRODUK */}
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          // Empty state
          <p className="text-center text-neutral-500 text-lg mt-20">
            Produk tidak ditemukan.
          </p>
        ) : (
          // Render product
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                subtitle={product.category.name}
                imageSrc={product.images[0] || "/image/default.png"}
                rating={4}
                price={Math.round(product.price * 15000)}
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
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
