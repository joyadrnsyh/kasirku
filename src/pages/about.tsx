"use client";

import { Button } from "@heroui/react";

import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white text-black pb-28">
        {/* HERO SECTION */}
        <section className="w-full text-center py-24 border-b border-neutral-200">
          <h1 className="text-5xl font-extrabold tracking-tight">ABOUT US</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg mt-4 leading-relaxed">
            We believe in creating high-quality, comfortable, and modern apparel
            for everyone. Designed with simplicity. Made with purpose.
          </p>
        </section>

        {/* BRAND STORY */}
        <section className="max-w-6xl mx-auto mt-24 px-8 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-extrabold mb-6">OUR STORY</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              YourBaju.id was created with a vision of bringing timeless and
              modern fashion to everyday wear. Inspired by Japanese minimalism,
              every product is crafted to deliver comfort, simplicity, and
              elegance without compromise.
            </p>

            <p className="text-neutral-600 leading-relaxed text-lg mt-5">
              We believe clothing should empower confidence while remaining
              accessible and functional for all lifestyles.
            </p>
          </div>

          {/* IMAGE */}
          <div className="w-full">
            <img
              src="https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg"
              width={700}
              height={700}
              alt="Minimal Fashion"
              className="w-full h-[400px] object-cover border border-neutral-200"
            />
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="max-w-6xl mx-auto mt-32 px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-center">
            OUR VALUES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <h3 className="text-xl font-bold tracking-wide">SIMPLICITY</h3>
              <p className="text-neutral-600 mt-4 text-sm leading-relaxed">
                Clean, functional, and essential. We design with intention —
                nothing more, nothing less.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold tracking-wide">QUALITY</h3>
              <p className="text-neutral-600 mt-4 text-sm leading-relaxed">
                Every product is made with premium materials to ensure comfort
                and durability.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold tracking-wide">INNOVATION</h3>
              <p className="text-neutral-600 mt-4 text-sm leading-relaxed">
                We continuously evolve through new fabrics, modern silhouettes,
                and better production.
              </p>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="max-w-6xl mx-auto mt-32 px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            MEET OUR TEAM
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <img
                  src="/image/placeholder.png"
                  width={250}
                  height={250}
                  alt="Team Member"
                  className="rounded-none border border-neutral-300 object-cover"
                />
                <h3 className="font-bold text-lg mt-4">Team Member {i}</h3>
                <p className="text-neutral-600 text-sm">Designer</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="max-w-4xl mx-auto mt-32 px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            WANT TO KNOW MORE?
          </h2>
          <p className="text-neutral-600 mt-4 text-lg leading-relaxed">
            We’re here to help. Explore our products or contact our support
            team.
          </p>

          <Button
            size="lg"
            radius="none"
            className="bg-black text-white font-bold tracking-wide mt-10 px-10 py-7 hover:bg-neutral-800"
          >
            CONTACT US
          </Button>
        </section>
      </div>
    </DefaultLayout>
  );
}
