import DefaultLayout from "@/layouts/default";
import { Frown } from "lucide-react";

export default function ShopKidsPage() {
  return (
    <DefaultLayout title="Toko | Koleksi Anak">
      <section className="px-6 md:px-10 mt-10 mb-20 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <Frown size={64} className="text-neutral-400 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Koleksi Anak
        </h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Mohon maaf, koleksi untuk anak-anak saat ini belum tersedia.
        </p>
        <p className="mt-2 text-neutral-500">
          Kami sedang bekerja keras untuk menghadirkannya segera!
        </p>
      </section>
    </DefaultLayout>
  );
}
