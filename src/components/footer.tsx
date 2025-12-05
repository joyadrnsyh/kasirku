import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 px-10 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-14">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide mb-4">
            YOURBAJU.ID
          </h2>
          <p className="text-stone-400 leading-relaxed text-sm">
            Premium fashion with minimalist Japanese aesthetic.
            <br />
            Modern • Comfortable • Essential
          </p>

          {/* SOCIAL MEDIA */}
          <div className="flex items-center gap-4 mt-6">
            <Link href="#" className="hover:text-white transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-stone-400 hover:text-white" href="#">
                Men
              </Link>
            </li>
            <li>
              <Link className="text-stone-400 hover:text-white" href="#">
                Women
              </Link>
            </li>
            <li>
              <Link className="text-stone-400 hover:text-white" href="#">
                New Arrival
              </Link>
            </li>
            <li>
              <Link className="text-stone-400 hover:text-white" href="#">
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-stone-400 hover:text-white" href="#">
                About Us
              </Link>
            </li>
            <li>
              <Link className="text-stone-400 hover:text-white" href="#">
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-stone-400 hover:text-white" href="#">
                Careers
              </Link>
            </li>
            <li>
              <Link className="text-stone-400 hover:text-white" href="#">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Join Newsletter
          </h3>
          <p className="text-stone-400 mb-4 text-sm">
            Get updates for new arrivals and exclusive offers.
          </p>

          <div className="flex items-center gap-3">
            <Input
              placeholder="Your email address"
              className="bg-white text-black rounded-lg"
              type="email"
            />
            <Button className="bg-stone-700 text-white hover:bg-stone-600 rounded-lg px-6">
              Join
            </Button>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-stone-500 text-sm mt-16 border-t border-stone-800 pt-6">
        © {new Date().getFullYear()} Glowvera. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
