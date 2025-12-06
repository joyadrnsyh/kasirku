import DefaultLayout from "@/layouts/default";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function OrdersPage() {
  const { orders } = useContext(CartContext);

  return (
    <DefaultLayout title="Pesanan Saya">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold text-center mb-10">
          Pesanan Saya
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            Belum ada pesanan.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border p-4 rounded-lg">
                <h2 className="font-semibold mb-2">Pesanan #{order.id}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Tanggal: {order.date}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.images[0] || "/image/default.png"}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p>Qty: {item.qty}</p>
                        <p>Harga: Rp {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-2 font-bold text-right">
                  Total: Rp {order.total.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
