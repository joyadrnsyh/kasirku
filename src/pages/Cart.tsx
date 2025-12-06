import { useContext, useState } from "react";
import { CartContext, CartItem, Order } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";

export default function CartPage() {
  const { cart, removeFromCart, orders, markOrderCompleted } =
    useContext(CartContext);
  const [activeTab, setActiveTab] = useState<"cart" | "orders" | "completed">(
    "cart"
  );
  const navigate = useNavigate();

  const totalCart = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const completedOrders = orders.filter((o) => o.status === "completed");

  const renderCartItems = (items: CartItem[]) =>
    items.map((item) => (
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
        </div>
        <div className="col-span-4 flex justify-end items-center gap-4">
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:text-red-800 transition text-sm"
          >
            Hapus
          </button>
        </div>
      </div>
    ));

  const renderOrderItems = (orders: Order[], showCompleteBtn = false) =>
    orders.length === 0 ? (
      <>
        <p className="text-center text-gray-500 mt-6">Tidak ada pesanan.</p>
        <p className="text-center text-gray-500 mt-6">
          Belum ada pesanan di tab ini.
        </p>
      </>
    ) : (
      orders.map((order) => (
        <div key={order.id} className="border-b py-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Order ID: {order.id}</span>
            <span className="text-gray-500 text-sm">
              Tanggal: {new Date(order.date).toLocaleDateString("id-ID")}
            </span>
          </div>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center gap-4 border-b py-3"
            >
              <div className="col-span-3">
                <img
                  src={item.images?.[0] || "/placeholder.png"}
                  alt={item.title}
                  className="w-full h-24 object-cover rounded-sm"
                />
              </div>
              <div className="col-span-5">
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-gray-600 mt-1">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
                <p className="text-gray-500 mt-1">Qty: {item.qty}</p>
              </div>
              <div className="col-span-4 flex justify-end items-center">
                <span className="font-semibold">
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2 font-bold">
            Total: Rp {order.total.toLocaleString("id-ID")}
          </div>
          {showCompleteBtn && (
            <div className="flex justify-end mt-2">
              <button
                onClick={() => markOrderCompleted(order.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Mark as Completed Tandai Selesai
              </button>
            </div>
          )}
        </div>
      ))
    );

  return (
    <DefaultLayout>
      <div className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">
          Keranjang Belanja
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-10 gap-4">
          <button
            onClick={() => setActiveTab("cart")}
            className={`px-6 py-2 font-semibold rounded ${
              activeTab === "cart"
                ? "bg-black text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            Keranjang ({cart.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 font-semibold rounded ${
              activeTab === "orders"
                ? "bg-black text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            Pesanan ({pendingOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2 font-semibold rounded ${
              activeTab === "completed"
                ? "bg-black text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            Selesai ({completedOrders.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "cart" && (
          <>
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 text-lg mt-20">
                Keranjang kosong.
              </p>
            ) : (
              <div className="space-y-8">
                {renderCartItems(cart)}

                <div className="flex justify-end items-center mt-6 border-t pt-6 font-semibold">
                  Total: Rp {totalCart.toLocaleString("id-ID")}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="bg-black text-white px-8 py-3 font-medium text-lg hover:bg-gray-800 transition rounded-sm"
                  >
                    Lanjut ke Pembayaran
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            {renderOrderItems(pendingOrders, true)}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="space-y-6">{renderOrderItems(completedOrders)}</div>
        )}
      </div>
    </DefaultLayout>
  );
}
