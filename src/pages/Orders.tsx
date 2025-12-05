export default function OrdersPage() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (!orders.length) {
    return <p className="text-center py-10">Belum ada pesanan.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {orders.map((item: any) => (
        <div key={item.id} className="border p-4 mb-3 rounded">
          <h2 className="font-semibold">{item.title}</h2>
          <p>Qty: {item.qty}</p>
          <p>Total: ${item.qty * item.price}</p>
        </div>
      ))}
    </div>
  );
}
