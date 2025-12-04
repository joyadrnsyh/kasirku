
import DefaultLayout from "@/layouts/default";


import { HeroSection } from "@/components/herosection";
import { ProductCard } from "@/components/productcart";

export default function IndexPage() {
  return (
    <DefaultLayout>
      {/* Hero / Main Section */}
      <section className="flex gap-6">
        <HeroSection />
      <div className="flex flex-col w-80">
        <div className="bg-white p-4 rounded-xl shadow-md justify-center items-center mb-6">
          <span className="font-semibold mb-2 inline-block text-lg ">Produk Populer</span>
          <div className="flex items-center justify-center"> <ProductCard
              title="New Gen X-Bud"
              image="/image/GlowVera-BrightSerum.png"
            />
          </div>
        </div>
      </div>
      </section>

      {/* Popular Products & Highlights */}
      <section className="mt-8 grid grid-cols-12 gap-6">
        {/* Left / More Products */}
        <div className="col-span-8 flex flex-wrap gap-4">
          <ProductCard
            title="New Gen X-Bud"
            image="/image/GlowVera-BrightSerum.png"
          />
          <ProductCard
            title="Light Grey Surface Headphone"
            subtitle="Boosted with bass"
            image="/image/GlowVera-BrightSerum.png"
          />
          <ProductCard
            title="Listening Has Been Released"
            image="/image/GlowVera-BrightSerum.png"
            rating={4.7}
          />
        </div>


      </section>
    </DefaultLayout>
  );
}
