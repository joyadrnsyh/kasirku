"use client";

import { Button } from "@heroui/react";

import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white text-black pb-28">
        {/* HERO SECTION */}
        <section className="w-full text-center py-24 border-b border-neutral-200 bg-neutral-50">
          <h1 className="text-5xl font-extrabold tracking-tight">
            TENTANG KAMI
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg mt-4 leading-relaxed">
            Kami percaya dalam menciptakan pakaian berkualitas tinggi, nyaman,
            dan modern untuk semua orang. Didesain dengan kesederhanaan. Dibuat
            dengan tujuan.
          </p>
        </section>

        {/* BRAND STORY */}
        <section className="max-w-6xl mx-auto mt-24 px-8 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-extrabold mb-6">CERITA KAMI</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              YourBaju.id diciptakan dengan visi untuk membawa mode yang tak
              lekang oleh waktu dan modern untuk pakaian sehari-hari.
              Terinspirasi oleh minimalisme Jepang, setiap produk dibuat untuk
              memberikan kenyamanan, kesederhanaan, dan keanggunan tanpa
              kompromi.
            </p>

            <p className="text-neutral-600 leading-relaxed text-lg mt-5">
              Kami percaya pakaian harus memberdayakan kepercayaan diri sambil
              tetap terjangkau dan fungsional untuk semua gaya hidup.
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
            NILAI-NILAI KAMI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <h3 className="text-xl font-bold tracking-wide">KESEDERHANAAN</h3>
              <p className="text-neutral-600 mt-4 text-sm leading-relaxed">
                Bersih, fungsional, dan esensial. Kami merancang dengan niat —
                tidak lebih, tidak kurang.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold tracking-wide">KUALITAS</h3>
              <p className="text-neutral-600 mt-4 text-sm leading-relaxed">
                Setiap produk dibuat dengan bahan premium untuk memastikan
                kenyamanan dan daya tahan.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold tracking-wide">INOVASI</h3>
              <p className="text-neutral-600 mt-4 text-sm leading-relaxed">
                Kami terus berkembang melalui kain baru, siluet modern, dan
                produksi yang lebih baik.
              </p>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="max-w-6xl mx-auto mt-32 px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            TEMUI TIM KAMI
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
                <h3 className="font-bold text-lg mt-4">Anggota Tim {i}</h3>
                <p className="text-neutral-600 text-sm">Desainer</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="max-w-4xl mx-auto mt-32 px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            INGIN TAHU LEBIH BANYAK?
          </h2>
          <p className="text-neutral-600 mt-4 text-lg leading-relaxed">
            Kami siap membantu. Jelajahi produk kami atau hubungi tim dukungan
            kami.
          </p>

          <Button
            size="lg"
            radius="none"
            className="bg-black text-white font-bold tracking-wide mt-10 px-10 py-7 hover:bg-neutral-800"
          >
            HUBUNGI KAMI
          </Button>
        </section>
      </div>
    </DefaultLayout>
  );
}
