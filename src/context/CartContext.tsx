import { createContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  qty: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  customer: { name: string; address: string };
  paymentMethod: string;
  date: string;
  status: "pending" | "completed";
}

interface CartContextType {
  cart: CartItem[];
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (product: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  markOrderCompleted: (orderId: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  cartItems: [],
  orders: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  addOrder: () => {},
  markOrderCompleted: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Omit<CartItem, "qty">) => {
    const exist = cart.find((p) => p.id === product.id);
    if (exist) {
      setCart(
        cart.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id: number) =>
    setCart(cart.filter((item) => item.id !== id));

  const updateQty = (id: number, qty: number) =>
    setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));

  const clearCart = () => setCart([]);

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: Date.now(),
      date: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const markOrderCompleted = (orderId: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "completed" } : o))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems: cart,
        orders,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        addOrder,
        markOrderCompleted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
