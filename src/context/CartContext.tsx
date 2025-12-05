import { createContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQty: (id: number, qty: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQty: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "qty">, qty: number = 1) => {
    const exist = cart.find((p) => p.id === product.id);

    if (exist) {
      setCart(
        cart.map((p) => (p.id === product.id ? { ...p, qty: p.qty + qty } : p))
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return; // Minimal qty = 1
    setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};
