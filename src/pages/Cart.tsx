import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Link } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <DefaultLayout>
      <div className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-8">
            {/* Cart Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center gap-4 border-b py-6"
              >
                <div className="col-span-3">
                  <img
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-sm"
                  />
                </div>
                <div className="col-span-5">
                  <h2 className="font-medium text-lg">{item.title}</h2>
                  <p className="text-gray-600 mt-1">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-gray-500 mt-1">Qty: {item.qty}</p>
                </div>
                <div className="col-span-4 flex justify-end items-center gap-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-end items-center mt-6 border-t pt-6">
              <span className="text-xl font-semibold">
                Total: Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-end mt-6">
              <Link
                to="/checkout"
                className="bg-black text-white px-8 py-3 font-medium text-lg hover:bg-gray-800 transition rounded-sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
