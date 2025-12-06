import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import ContactPage from "@/pages/contact";
import PricingPage from "@/pages/pricing";
import AboutPage from "@/pages/about";
import NotFound from "@/pages/404";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout";
import OrdersPage from "@/pages/Orders";
import ProductDetailPage from "./pages/ProductDetailPage";
// 1. Impor semua halaman baru yang telah dibuat
import ShopPage from "./pages/shop/index";
import ShopMenPage from "./pages/shop/men";
import ShopWomenPage from "./pages/shop/women";
import ShopKidsPage from "./pages/shop/kids";
import ShopNewPage from "./pages/shop/new";
import ShopBestsellerPage from "./pages/shop/bestseller";
import ShopSalePage from "./pages/shop/sale";
import CollectionsPage from "./pages/collections";
import CollectionEssentialsPage from "./pages/collections/essentials";
import CollectionJapanesePage from "./pages/collections/japanese";
import CollectionCottonPage from "./pages/collections/cotton";
import CollectionWinterPage from "./pages/collections/winter";
import CollectionSummerPage from "./pages/collections/summer";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ContactPage />} path="/contact" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<CartPage />} path="/cart" />
      <Route element={<CheckoutPage />} path="/checkout" />
      <Route element={<OrdersPage />} path="/orders" />
      <Route element={<NotFound />} path="*" />
      <Route element={<ProductDetailPage />} path="/product/:id" />
      {/* 2. Tambahkan route untuk halaman baru di bawah ini */}
      <Route element={<ShopPage />} path="/shop" />
      <Route element={<ShopMenPage />} path="/shop/men" />
      <Route element={<ShopWomenPage />} path="/shop/women" />
      <Route element={<ShopKidsPage />} path="/shop/kids" />
      <Route element={<ShopNewPage />} path="/shop/new" />
      <Route element={<ShopBestsellerPage />} path="/shop/bestseller" />
      <Route element={<ShopSalePage />} path="/shop/sale" />
      <Route element={<CollectionsPage />} path="/collections" />
      <Route
        element={<CollectionEssentialsPage />}
        path="/collections/essentials"
      />
      <Route
        element={<CollectionJapanesePage />}
        path="/collections/japanese"
      />
      <Route element={<CollectionCottonPage />} path="/collections/cotton" />
      <Route element={<CollectionWinterPage />} path="/collections/winter" />
      <Route element={<CollectionSummerPage />} path="/collections/summer" />
    </Routes>
  );
}

export default App;
