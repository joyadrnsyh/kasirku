import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import ContactPage from "@/pages/contact";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import SemuaProduk from "./pages/shop/sale";
import NotFound from "@/pages/404";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ContactPage />} path="/contact" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<NotFound />} path="*" />
      <Route element={<SemuaProduk />} path="/shop/sale" />
    </Routes>
  );
}

export default App;
