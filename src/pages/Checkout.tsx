import { useContext, useState } from "react";
import { CartContext, CartItem } from "@/context/CartContext";
import DefaultLayout from "@/layouts/default";
import { ToastContext } from "@/components/ToastProvider";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";

export default function CheckoutPage() {
  const { cart, updateQty, clearCart, addOrder } = useContext(CartContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [showInvoice, setShowInvoice] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [showQR, setShowQR] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const generateOrderNumber = () =>
    "INV-" + Math.floor(100000 + Math.random() * 900000);

  const handleSubmit = () => {
    if (!fullName || !address) {
      addToast({
        title: "Form Tidak Lengkap ❌",
        description: "Silakan isi nama lengkap dan alamat Anda.",
        type: "error",
      });
      return;
    }

    const orderId = generateOrderNumber();

    const newOrder = {
      id: orderId,
      customer: { name: fullName, address },
      items: [...cart],
      paymentMethod,
      total,
      status: paymentMethod === "cod" ? "Paid" : "Pending Payment",
      date: new Date().toLocaleString(),
    };

    addOrder(newOrder);
    clearCart();
    setOrder(newOrder);
    setShowInvoice(true);

    if (paymentMethod !== "cod") setShowQR(true);

    addToast({
      title: "Pesanan Dibuat 🎉",
      description: `Pesanan Anda ${orderId} telah berhasil dibuat!`,
      type: "success",
    });
  };

  const handlePayQR = () => {
    if (!order) return;
    setOrder({ ...order, status: "Paid" });
    setShowQR(false);
    addToast({
      title: "Pembayaran Berhasil ✅",
      description: `Pembayaran untuk ${order.id} telah selesai.`,
      type: "success",
    });
  };

  // PDF Invoice dengan desain lebih rapi
  const generatePDF = () => {
    if (!order) return;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const margin = 40;
    let y = margin;

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 297.5, y, { align: "center" }); // center page width A4 ~595pt
    y += 30;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Nomor Pesanan: ${order.id}`, margin, y);
    y += 16;
    doc.text(`Tanggal: ${order.date}`, margin, y);
    y += 16;
    doc.text(`Pelanggan: ${order.customer.name}`, margin, y);
    y += 16;
    doc.text(`Alamat: ${order.customer.address}`, margin, y);
    y += 16;
    doc.text(`Metode Pembayaran: ${order.paymentMethod}`, margin, y);
    y += 16;
    doc.text(
      `Status: ${order.status === "Paid" ? "Lunas" : "Menunggu Pembayaran"}`,
      margin,
      y
    );
    y += 20;

    // Garis pemisah
    doc.setLineWidth(0.5);
    doc.line(margin, y, 595 - margin, y);
    y += 15;

    // Tabel header
    doc.setFont("helvetica", "bold");
    doc.setFillColor(230, 230, 230);
    doc.rect(margin, y, 515, 20, "F"); // rectangle untuk header tabel
    doc.text("Produk", margin + 5, y + 14);
    doc.text("Jml", margin + 220, y + 14);
    doc.text("Harga", margin + 290, y + 14);
    doc.text("Subtotal", margin + 400, y + 14);
    y += 20;

    // Tabel isi
    doc.setFont("helvetica", "normal");
    order.items.forEach((item: CartItem) => {
      doc.text(item.title, margin + 5, y + 14);
      doc.text(item.qty.toString(), margin + 220, y + 14);
      doc.text(
        `Rp ${item.price.toLocaleString("id-ID")}`,
        margin + 290,
        y + 14
      );
      doc.text(
        `Rp ${(item.price * item.qty).toLocaleString("id-ID")}`,
        margin + 400,
        y + 14
      );
      y += 20;
    });

    // Garis sebelum total
    y += 10;
    doc.setLineWidth(0.5);
    doc.line(margin, y, 595 - margin, y);
    y += 20;

    // Total
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total: Rp ${order.total.toLocaleString("id-ID")}`,
      margin + 400,
      y
    );

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Terima kasih telah berbelanja! Jika ada pertanyaan, hubungi support@example.com",
      margin,
      780
    );

    doc.save(`${order.id}.pdf`);
  };

  const increment = (item: CartItem) => updateQty(item.id, item.qty + 1);
  const decrement = (item: CartItem) =>
    item.qty > 1 ? updateQty(item.id, item.qty - 1) : null;

  return (
    <DefaultLayout>
      <div className="max-w-5xl mx-auto py-16 px-6 relative">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">
          Checkout
        </h1>

        {cart.length === 0 && !showInvoice ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            Keranjang Anda kosong.
          </p>
        ) : (
          <>
            {!showInvoice ? (
              <div className="space-y-12">
                {/* Cart Items */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Produk Anda</h2>
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

                {/* Shipping Details */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    Detail Pengiriman
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Nama lengkap Anda"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Alamat</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Alamat pengiriman Anda"
                      />
                    </div>
                  </div>
                </section>

                {/* Payment Method */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    Metode Pembayaran
                  </h2>
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="credit_card"
                        checked={paymentMethod === "credit_card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      Kartu Kredit
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="bank_transfer"
                        checked={paymentMethod === "bank_transfer"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      Transfer Bank
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      Bayar di Tempat (COD)
                    </label>
                  </div>
                </section>

                {/* Total & Confirm */}
                <section className="flex flex-col md:flex-row justify-between items-center border-t pt-6">
                  <span className="text-2xl font-bold">
                    Total: Rp {total.toLocaleString("id-ID")}
                  </span>
                  <button
                    onClick={handleSubmit}
                    className="mt-4 md:mt-0 bg-black text-white px-8 py-3 font-medium text-lg hover:bg-gray-800 transition rounded-sm"
                  >
                    Konfirmasi Pesanan
                  </button>
                </section>
              </div>
            ) : (
              /* Invoice + Payment QR */
              <section className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Invoice</h2>
                <p>
                  Nomor Pesanan: <strong>{order?.id}</strong>
                </p>
                <p>Tanggal: {order?.date}</p>
                <p>Pelanggan: {order?.customer.name}</p>
                <p>Alamat: {order?.customer.address}</p>
                <p>Metode Pembayaran: {order?.paymentMethod}</p>
                <p>
                  Status:{" "}
                  {order?.status === "Paid" ? "Lunas" : "Menunggu Pembayaran"}
                </p>

                <table className="w-full text-left border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-3 py-2 border">Produk</th>
                      <th className="px-3 py-2 border">Jumlah</th>
                      <th className="px-3 py-2 border">Harga</th>
                      <th className="px-3 py-2 border">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.items.map((item: CartItem) => (
                      <tr key={item.id}>
                        <td className="px-3 py-2 border">{item.title}</td>
                        <td className="px-3 py-2 border">{item.qty}</td>
                        <td className="px-3 py-2 border">
                          Rp {item.price.toLocaleString("id-ID")}
                        </td>
                        <td className="px-3 py-2 border">
                          Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="text-right text-xl font-bold mt-4">
                  Total: Rp {order?.total.toLocaleString("id-ID")}
                </p>

                {showQR && (
                  <div className="flex flex-col items-center mt-4">
                    <p className="mb-2">Pindai QR untuk membayar (Simulasi)</p>
                    <QRCodeSVG
                      value={`PAY-${order?.id}-${order?.total}`}
                      width={150}
                      height={150}
                    />
                    <button
                      onClick={handlePayQR}
                      className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                    >
                      Simulasikan Pembayaran
                    </button>
                  </div>
                )}

                <div className="flex justify-center mt-4 gap-4">
                  <button
                    onClick={generatePDF}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Unduh PDF
                  </button>
                  <button
                    onClick={() => navigate("/orders")}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                  >
                    Lihat Pesanan
                  </button>
                </div>
              </section>
            )}
          </>
        )}

        <AnimatePresence />
      </div>
    </DefaultLayout>
  );
}
