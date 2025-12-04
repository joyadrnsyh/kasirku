import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { ChevronDown } from "lucide-react";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/navbar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";

import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  WhatsAppIcon,
  SearchIcon
} from "@/components/icons";

export const Navbar = () => {
  // Search input box
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      
      {/* LEFT SECTION */}
      <NavbarContent
        justify="start"
        className="basis-1/5 sm:basis-full items-center"
      >
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            GlowVera
          </Link>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 ml-6 items-center">
          {siteConfig.navItems.map((item: any) => {
            // PRODUCTS DROPDOWN MENU
           if (item.label === "Products") {
            return (
              <Dropdown key="products">
                <DropdownTrigger>
                  <Button
                    variant="light"
                    disableRipple
                    className="h-auto px-0 py-0 bg-transparent text-foreground data-[hover=true]:bg-transparent data-[focus=true]:bg-transparent text-md justify-items-center"
                  >
                    Products
                    <ChevronDown size={16} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Products">
                  {item.dropdown?.map((sub: any) => (
                    <DropdownItem key={sub.href}>
                      <Link href={sub.href}>{sub.label}</Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            );
}


            // NORMAL MENU ITEMS
            return (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary"
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
        </div>
      </NavbarContent>

      {/* RIGHT SECTION */}
      <NavbarContent justify="end" className="hidden sm:flex">
        
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter}><TwitterIcon /></Link>
          <Link isExternal href={siteConfig.links.discord}><DiscordIcon /></Link>
          <Link isExternal href={siteConfig.links.github}><GithubIcon /></Link>
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
          {searchInput}
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            href={siteConfig.links.sponsor}
            variant="flat"
            className="bg-default-100"
          >
            <WhatsAppIcon className="text-success" />
            Hubungi Kami
          </Button>
        </NavbarItem>

      </NavbarContent>

      {/* MOBILE BURGER TOGGLE */}
      <NavbarContent justify="end" className="sm:hidden">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu>
        {searchInput}

        {siteConfig.navItems.map((item: any) => (
          <NavbarMenuItem key={item.label}>

            {item.dropdown ? (
              <details className="group">
                <summary className="cursor-pointer text-lg">{item.label}</summary>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {item.dropdown.map((sub: any) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="text-default-500"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}

          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </HeroUINavbar>
  );
};
