// utils/getPageContent.ts
export const getPageContent = (): string => {
  // Ambil teks seluruh halaman
  let content = document.body.innerText;

  // Hapus teks kosong atau spasi berlebih
  content = content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join("\n");

  return content;
};
