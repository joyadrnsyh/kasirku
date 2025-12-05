export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "GlowVera",
  description: "Premium cosmetic e-commerce built with HeroUI.",

  // MENU UTAMA (tanpa dropdown)
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
      dropdown: [
      { label: "Semua Produk", href: "/produk/semuaproduk" },
      { label: "Makeup", href: "/products/makeup" },
      { label: "Bodycare", href: "/products/bodycare" },
      { label: "Haircare", href: "/products/haircare" },
    ],
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],

  // DROPDOWN PRODUCTS (dipakai di navbar)
  products: [
    { label: "Skincare", href: "/products/skincare" },
    { label: "Makeup", href: "/products/makeup" },
    { label: "Bodycare", href: "/products/bodycare" },
    { label: "Haircare", href: "/products/haircare" },
  ],

  // NAV MENU (mobile)
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],

  // LINKS SOSIAL
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
