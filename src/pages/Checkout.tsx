import { useContext } from "react";
import { CartContext, CartItem } from "@/context/CartContext";
import DefaultLayout from "@/layouts/default";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, updateQty, clearCart } = useContext(CartContext);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  // Hitung total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = () => {
    if (!fullName || !address) {
      alert("Please fill in your name and address.");
      return;
    }

    const order = {
      customer: { name: fullName, address },
      items: cart,
      paymentMethod,
      total,
    };

    localStorage.setItem("orders", JSON.stringify(order));
    clearCart();
    alert("Order placed successfully!");
  };

  const increment = (item: CartItem) => updateQty(item.id, item.qty + 1);
  const decrement = (item: CartItem) =>
    item.qty > 1 ? updateQty(item.id, item.qty - 1) : null;

  return (
    <DefaultLayout>
      <div className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-12">
            {/* 1. Cart Items */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 items-center gap-4 border-b py-4"
                  >
                    <div className="col-span-3">
                      <img
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.title}
                        className="w-full h-28 object-cover rounded-sm"
                      />
                    </div>
                    <div className="col-span-5">
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-gray-600 mt-1">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => decrement(item)}
                          className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => increment(item)}
                          className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-span-4 flex justify-end items-center">
                      <span className="text-lg font-semibold">
                        Rp {(item.price * item.qty).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Shipping Details */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Your full name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Your shipping address"
                  />
                </div>
              </div>
            </section>

            {/* 3. Payment Method */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit Card
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Bank Transfer
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
              </div>
            </section>

            {/* 4. Total & Confirm */}
            <section className="flex flex-col md:flex-row justify-between items-center border-t pt-6">
              <span className="text-2xl font-bold">
                Total: Rp {total.toLocaleString("id-ID")}
              </span>
              <button
                onClick={handleSubmit}
                className="mt-4 md:mt-0 bg-black text-white px-8 py-3 font-medium text-lg hover:bg-gray-800 transition rounded-sm"
              >
                Confirm Order
              </button>
            </section>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
