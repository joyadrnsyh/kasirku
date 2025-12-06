import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext, CartItem } from "@/context/CartContext";
import DefaultLayout from "@/layouts/default";
import { Star } from "lucide-react";
import { addToast } from "@heroui/toast";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  reviews?: Review[];
}

const IDR_EXCHANGE_RATE = 15000;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Form ulasan
  const [reviewForm, setReviewForm] = useState({
    reviewerName: "",
    reviewerEmail: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data: Product = await res.json();
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;

    const item: CartItem = {
      id: product.id,
      title: product.title,
      price: Math.round(product.price * IDR_EXCHANGE_RATE),
      images: product.images,
      qty: quantity,
    };

    addToCart(item);

    addToast({
      title: "Keranjang 🛒",
      description: `Produk "${product.title}" berhasil ditambahkan ke keranjang.`,
      variant: "flat",
      color: "success",
    });
  };

  const handleBuyNow = () => {
    if (!product) return;

    addToast({
      title: "Pembelian Berhasil 🎉",
      description: `Produk "${product.title}" berhasil dibeli.`,
      variant: "solid",
      color: "success",
    });
  };

  const renderRating = (rate: number) => (
    <div className="flex items-center gap-1 mt-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={`w-4 h-4 ${
            idx < Math.round(rate) ? "text-black fill-black" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm ml-2 text-gray-600">({rate.toFixed(1)})</span>
    </div>
  );

  // Tambah ulasan baru
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const newReview: Review = {
      ...reviewForm,
      date: new Date().toISOString(),
    };

    setProduct({
      ...product,
      reviews: [newReview, ...(product.reviews || [])],
    });

    addToast({
      title: "Ulasan Ditambahkan",
      description: `Terima kasih atas ulasan Anda!`,
      variant: "solid",
      color: "success",
    });

    // Reset form
    setReviewForm({
      reviewerName: "",
      reviewerEmail: "",
      rating: 5,
      comment: "",
    });
  };

  if (!product) {
    return (
      <DefaultLayout>
        <div className="max-w-5xl mx-auto py-16 px-6 text-center text-gray-500">
          Produk tidak ditemukan.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto py-16 px-4 flex flex-col md:flex-row gap-12">
        {/* IMAGE SECTION */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-96 object-cover rounded-md border"
          />
          <div className="flex gap-2 mt-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                  selectedImage === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500 text-sm">{product.category}</p>
          {product.rating > 0 && renderRating(product.rating)}

          <p className="text-3xl font-semibold mt-3">
            Rp{" "}
            {Math.round(product.price * IDR_EXCHANGE_RATE).toLocaleString(
              "id-ID"
            )}
          </p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 text-gray-600 text-sm space-y-1">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock} pcs
            </p>
            <p>
              <strong>Weight:</strong> {product.weight} g
            </p>
            <p>
              <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
              {product.dimensions.height} x {product.dimensions.depth} cm
            </p>
            <p>
              <strong>Warranty:</strong> {product.warrantyInformation}
            </p>
            <p>
              <strong>Shipping:</strong> {product.shippingInformation}
            </p>
            <p>
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
          </div>

          {/* QUANTITY & BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <span className="font-medium">Quantity</span>
              <button
                onClick={decrement}
                className="w-8 h-8 border flex items-center justify-center hover:bg-gray-200 transition"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={increment}
                className="w-8 h-8 border flex items-center justify-center hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
            <div className="flex gap-4 flex-1">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 border border-black text-black py-3 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {product.reviews?.length ? (
              product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border p-4 rounded-md mb-3 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.reviewerName}</span>
                    {renderRating(review.rating)}
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(review.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                Belum ada ulasan untuk produk ini.
              </p>
            )}

            {/* FORM TAMBAH ULASAN */}
            <form
              onSubmit={handleSubmitReview}
              className="mt-6 border p-4 rounded-md bg-gray-50 space-y-3"
            >
              <h3 className="font-medium text-lg">Tambahkan Ulasan</h3>
              <input
                type="text"
                placeholder="Nama Anda"
                value={reviewForm.reviewerName}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, reviewerName: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email Anda"
                value={reviewForm.reviewerEmail}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    reviewerEmail: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
                required
              />
              <select
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    rating: Number(e.target.value),
                  })
                }
                className="w-full border p-2 rounded"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Komentar Anda"
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition"
              >
                Kirim Ulasan
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDetailPage;
