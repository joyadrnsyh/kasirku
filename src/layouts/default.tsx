import React, { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Provider } from "@/provider";
import Footer from "@/components/footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DefaultLayout({
  children,
  title = "byuheart - Your Trusted E-commerce Platform",
}: DefaultLayoutProps) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = title;
    }
  }, [title]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Provider>
        <main className="flex-grow pt-20 pb-10">
          <div className="mx-auto max-w-7xl px-6">{children}</div>
        </main>
      </Provider>

      {/* Footer */}
      <Footer />
    </div>
  );
}
