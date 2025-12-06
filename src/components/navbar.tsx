import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { ChevronDown, ShoppingCart } from "lucide-react";
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

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { SearchIcon } from "@/components/icons";

export const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  const totalCartItems = cartItems.reduce(
    (acc: number, item: { qty: number }) => acc + item.qty,
    0
  );

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

        {/* Cart Button */}
        <Link href="/cart" className="relative">
          <ShoppingCart size={24} className="text-black" />
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </Link>

        <Avatar
          isBordered
          color="default"
          className="h-10 w-10 rounded-full"
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

        {/* Mobile Cart */}
        <NavbarMenuItem>
          <Link href="/cart" className="relative flex items-center gap-2">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {totalCartItems > 0 && (
              <span className="ml-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
