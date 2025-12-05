"use client";

import { Input, Textarea, Button } from "@heroui/react";
import { Mail, Phone, MapPin } from "lucide-react";
import DefaultLayout from "@/layouts/default";
export default function ContactPage() {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white text-black pb-28">
        {/* HEADER SECTION */}
        <section className="w-full text-center py-20 border-b border-neutral-200">
          <h1 className="text-5xl font-extrabold tracking-tight">CONTACT</h1>
          <p className="text-neutral-600 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            Reach out to us for support, collaboration, or product inquiries.
          </p>
        </section>

        {/* INFO GRID — UNIQLO CLEAN STYLE */}
        <section className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          <div className="flex flex-col items-center text-center gap-3">
            <Mail size={40} className="text-black" />
            <h3 className="text-lg font-bold tracking-wide">EMAIL</h3>
            <p className="text-neutral-600 text-sm">support@yourbaju.id</p>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <Phone size={40} className="text-black" />
            <h3 className="text-lg font-bold tracking-wide">WHATSAPP</h3>
            <p className="text-neutral-600 text-sm">+62 812-3456-7890</p>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <MapPin size={40} className="text-black" />
            <h3 className="text-lg font-bold tracking-wide">ADDRESS</h3>
            <p className="text-neutral-600 text-sm">Sleman, Yogyakarta</p>
          </div>
        </section>

        {/* FORM SECTION */}
        <section className="max-w-2xl mx-auto mt-24 px-8">
          <h2 className="text-3xl font-extrabold text-center tracking-tight">
            SEND US A MESSAGE
          </h2>

          <form className="grid grid-cols-1 gap-8 mt-12">
            <Input
              size="lg"
              label="Full Name"
              radius="none"
              classNames={{
                inputWrapper: "border-b border-neutral-300 rounded-none",
              }}
            />

            <Input
              size="lg"
              type="email"
              label="Email"
              radius="none"
              classNames={{
                inputWrapper: "border-b border-neutral-300 rounded-none",
              }}
            />

            <Input
              size="lg"
              label="Phone / WhatsApp"
              radius="none"
              classNames={{
                inputWrapper: "border-b border-neutral-300 rounded-none",
              }}
            />

            <Textarea
              minRows={5}
              label="Message"
              radius="none"
              classNames={{
                inputWrapper: "border-b border-neutral-300 rounded-none",
              }}
            />

            <Button
              size="lg"
              radius="none"
              className="bg-black text-white font-bold tracking-wide py-7 hover:bg-neutral-800"
            >
              SEND MESSAGE
            </Button>
          </form>
        </section>

        {/* MAP */}
        <section className="max-w-5xl mx-auto mt-24 px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-center">
            OUR LOCATION
          </h2>

          <div className="w-full h-[400px] mt-10 border border-neutral-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              className="w-full h-full"
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
