import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@heroui/react";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { siteConfig } from "@/config/site";
import { SearchIcon } from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-neutral-100 border border-neutral-300 shadow-none",
        input: "text-sm",
      }}
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-neutral-500 pointer-events-none" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-white border-b border-neutral-200 h-20 z-[999]"
    >
      {/* LEFT - BRAND */}
      <NavbarContent justify="start" className="basis-1/5 sm:basis-full">
        <NavbarBrand>
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tight text-black"
          >
            YOURBAJU.ID
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* MID - DESKTOP MENU */}
      <NavbarContent justify="center" className="hidden lg:flex gap-8">
        {siteConfig.navItems.map((item: any) => {
          if (item.dropdown) {
            return (
              <Dropdown key={item.label} placement="bottom-start">
                <DropdownTrigger>
                  <Button
                    variant="light"
                    disableRipple
                    className="uppercase text-sm font-semibold tracking-wide text-black hover:text-neutral-600 bg-transparent px-0 data-[hover=true]:bg-transparent"
                  >
                    {item.label}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  aria-label={item.label}
                  className="rounded-none shadow-md border border-neutral-200 bg-white"
                >
                  {item.dropdown.map((sub: any) => (
                    <DropdownItem key={sub.href}>
                      <Link
                        href={sub.href}
                        className="text-sm text-neutral-700 hover:text-black"
                      >
                        {sub.label}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            );
          }

          return (
            <NavbarItem key={item.href}>
              <Link
                href={item.href}
                className="uppercase text-sm font-semibold tracking-wide text-black hover:text-neutral-600"
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* RIGHT */}
      <NavbarContent
        justify="end"
        className="hidden lg:flex gap-6 items-center"
      >
        {searchInput}

        <Avatar
          isBordered
          color="default"
          radius="sm"
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        />
      </NavbarContent>

      {/* MOBILE TOGGLE */}
      <NavbarContent justify="end" className="lg:hidden">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu className="bg-white">
        <div className="px-4 py-3">{searchInput}</div>

        {siteConfig.navItems.map((item: any) => (
          <NavbarMenuItem key={item.label}>
            {item.dropdown ? (
              <details className="group">
                <summary className="cursor-pointer text-lg font-semibold uppercase">
                  {item.label}
                </summary>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {item.dropdown.map((sub: any) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="text-neutral-600 text-sm"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                href={item.href}
                className="text-lg font-semibold uppercase text-black"
              >
                {item.label}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
