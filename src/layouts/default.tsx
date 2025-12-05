import React, { useEffect } from "react"; // Tambahkan React import eksplisit
import { Navbar } from "@/components/navbar";
import {Provider} from "@/provider";
import Footer from "@/components/footer";


interface DefaultLayoutProps {
  children: React.ReactNode;
  title?: string; // Judul bisa dikustom per halaman
}

export default function DefaultLayout({
  children,
  // Menggunakan default prop dari parameter destructuring
  title = "yourBaju.id - Premium Fashion for Everyday Confidence", 
}: DefaultLayoutProps) {
  
  // Set judul dokumen ketika komponen dimuat atau 'title' berubah
  useEffect(() => {
    // Pastikan kita berada di sisi klien (browser) sebelum mengakses 'document'
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  }, [title]);

  return (
    // Kontainer utama: memastikan tinggi minimal 100% viewport
    <div className="relative flex flex-col min-h-screen bg-pink-50"> 
      
      {/* Navbar di atas */}
      <Navbar /> 

      {/* Konten Utama (Main Content) */}
      {/* pt-16 memberi padding atas agar konten tidak tertutup Navbar fixed (asumsi Navbar tingginya ~64px atau h-16) */}
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
                <Provider>
                {children}
                </Provider>

      </main>
    <Footer />
    
    </div>
  );
}