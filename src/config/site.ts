export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "GlowVera",
  description: "Minimalist fashion e-commerce inspired by Japanese style.",

  // ===========================
  // NAVIGATION (DESKTOP)
  // ===========================
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shop",
      href: "/shop",
      dropdown: [
        { label: "Men", href: "/shop/men" },
        { label: "Women", href: "/shop/women" },
        { label: "Kids", href: "/shop/kids" },
        { label: "New Arrivals", href: "/shop/new" },
        { label: "Best Sellers", href: "/shop/bestseller" },
        { label: "Sale", href: "/shop/sale" },
      ],
    },
    {
      label: "Collections",
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
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },

  ],

  // ===========================
  // NAVIGATION (MOBILE MENU)
  // ===========================
  navMenuItems: [
    { label: "Home", href: "/" },
    { label: "Shop - Men", href: "/shop/men" },
    { label: "Shop - Women", href: "/shop/women" },
    { label: "Shop - Kids", href: "/shop/kids" },
    { label: "New Arrivals", href: "/shop/new" },
    { label: "Best Sellers", href: "/shop/bestseller" },
    { label: "Sale", href: "/shop/sale" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
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
