import DefaultLayout from "@/layouts/default";

export default function About() {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-lg text-default-500">
          Ini adalah halaman About. Sesuaikan konten ini dengan informasi toko,
          misi, kontak, atau apa pun yang Anda inginkan.
        </p>
      </div>
    </DefaultLayout>
  );
}
