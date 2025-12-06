export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "byuheart",
  description: "E-commerce fashion minimalis yang terinspirasi dari gaya Jepang.",

  // ===========================
  // NAVIGATION (DESKTOP)
  // ===========================
  navItems: [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Toko",
      href: "/shop",
      dropdown: [
        { label: "Pria", href: "/shop/men" },
        { label: "Wanita", href: "/shop/women" },
        { label: "Anak", href: "/shop/kids" },
        { label: "Pendatang Baru", href: "/shop/new" },
        { label: "Terlaris", href: "/shop/bestseller" },
        { label: "Diskon", href: "/shop/sale" },
      ],
    },
    {
      label: "Koleksi",
      href: "/collections",
      dropdown: [
        { label: "Essentials", href: "/collections/essentials" },
        { label: "Japanese Minimalist", href: "/collections/japanese" },
        { label: "Premium Cotton", href: "/collections/cotton" },
        { label: "Winter Collection", href: "/collections/winter" },
        { label: "Summer Wear", href: "/collections/summer" },
      ],
    },
    {
      label: "Tentang Kami",
      href: "/about",
    },
    {
      label: "Kontak",
      href: "/contact",
    },

  ],

  // ===========================
  // NAVIGATION (MOBILE MENU)
  // ===========================
  navMenuItems: [
    { label: "Beranda", href: "/" },
    { label: "Toko - Pria", href: "/shop/men" },
    { label: "Toko - Wanita", href: "/shop/women" },
    { label: "Toko - Anak", href: "/shop/kids" },
    { label: "Pendatang Baru", href: "/shop/new" },
    { label: "Terlaris", href: "/shop/bestseller" },
    { label: "Diskon", href: "/shop/sale" },
    { label: "Koleksi", href: "/collections" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ],

  // ===========================
  // SOCIAL LINKS
  // ===========================
  links: {
    github: "https://github.com/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
    docs: "https://heroui.com",
  },
};
