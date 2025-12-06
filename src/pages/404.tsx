export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* BIG 404 */}
      <h1 className="text-[120px] font-extrabold tracking-tight text-black leading-none">
        404
      </h1>

      {/* TITLE */}
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-800">
        Halaman Tidak Ditemukan
      </h2>

      {/* SUBTEXT */}
      <p className="mt-3 text-neutral-500 max-w-md">
        Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        Silakan kembali ke halaman utama.
      </p>

      {/* BUTTONS */}
      <div className="mt-8 flex gap-4">
        <a
          href="/"
          className="px-6 py-3 bg-black text-white text-sm tracking-wide uppercase font-semibold hover:bg-neutral-800 transition-all"
        >
          Kembali ke Beranda
        </a>

        <a
          href="/shop/sale"
          className="px-6 py-3 border border-black text-black text-sm tracking-wide uppercase font-semibold hover:bg-black hover:text-white transition-all"
        >
          Lihat Produk
        </a>
      </div>

      {/* SMALL FOOTER NOTE */}
      <p className="mt-10 text-xs text-neutral-400 tracking-wide">
        YOURBAJU.ID — Fashion Minimalis Jepang
      </p>
    </div>
  );
}
