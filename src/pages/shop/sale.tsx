import DefaultLayout from "@/layouts/default";
import { useEffect, useState, useMemo, useContext } from "react";
import ProductCard from "@/components/productcart";
import { addToast } from "@heroui/toast";
import { CartContext } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { name: string };
  images: string[];
}

const IDR_EXCHANGE_RATE = 15000;
const ITEMS_PER_PAGE = 10;

export default function SemuaProduk() {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // API 1
        const res1 = await fetch("https://dummyjson.com/products");
        const data1 = await res1.json();
        const api1Products: Product[] = data1.products.map((p: any) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          description: p.description,
          category: { name: p.category },
          images: p.images,
        }));

        // API 2
        const res2 = await fetch("https://fakestoreapi.com/products");
        const data2 = await res2.json();
        const api2Products: Product[] = data2.map((p: any) => ({
          id: 1000 + p.id,
          title: p.title,
          price: p.price,
          description: p.description,
          category: { name: p.category },
          images: [p.image],
        }));

        setProducts([...api1Products, ...api2Products]);
      } catch (err) {
        console.error(err);
        addToast({
          title: "Error ❌",
          description: "Gagal memuat daftar produk.",
          variant: "flat",
          color: "danger",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const catSet = new Set(products.map((p) => p.category.name));
    return ["all", ...Array.from(catSet)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim())
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );

    if (category !== "all")
      list = list.filter((p) => p.category.name === category);

    if (sort === "price_low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_high") list.sort((a, b) => b.price - a.price);
    else if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "za") list.sort((a, b) => b.title.localeCompare(a.title));

    return list;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

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

    addToast({
      title: "Pembelian Berhasil 🎉",
      description: `Produk ${product.title} telah diproses.`,
      variant: "flat",
      color: "success",
    });
  };

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
        <h1 className="text-3xl font-semibold text-center tracking-tight mb-10">
          Semua Produk
        </h1>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-neutral-300 px-4 py-2 rounded-md w-full md:w-1/3
              focus:outline-none focus:ring-1 focus:ring-black"
          />
          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-neutral-300 px-3 py-2 rounded-md 
                focus:outline-none focus:ring-1 focus:ring-black"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Semua Kategori" : cat}
                </option>
              ))}
            </select>

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

        {/* PRODUCT LIST */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-neutral-500 text-lg mt-20">
            Produk tidak ditemukan.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  subtitle={product.category.name}
                  imageSrc={product.images[0] || "/image/default.png"}
                  rating={4}
                  price={Math.round(product.price * IDR_EXCHANGE_RATE)}
                  onAddToCart={() => handleAddToCart(product)}
                  onBuy={() => handleBuy(product)}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
