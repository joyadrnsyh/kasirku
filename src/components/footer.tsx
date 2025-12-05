import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 px-10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-14">
        
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">YourBrand</h2>
          <p className="text-stone-400">
            Premium fashion for everyday confidence.  
            Stylish • Comfortable • Modern
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-3">
            <li><Link className="text-stone-400 hover:text-white" href="#">Men</Link></li>
            <li><Link className="text-stone-400 hover:text-white" href="#">Women</Link></li>
            <li><Link className="text-stone-400 hover:text-white" href="#">New Arrival</Link></li>
            <li><Link className="text-stone-400 hover:text-white" href="#">Sale</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-3">
            <li><Link className="text-stone-400 hover:text-white" href="#">About Us</Link></li>
            <li><Link className="text-stone-400 hover:text-white" href="#">Contact</Link></li>
            <li><Link className="text-stone-400 hover:text-white" href="#">Careers</Link></li>
            <li><Link className="text-stone-400 hover:text-white" href="#">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Join Newsletter</h3>
          <p className="text-stone-400 mb-4">
            Get updates about new collections & special offers.
          </p>

          <div className="flex items-center gap-3">
            <Input 
              placeholder="Enter your email"
              className="text-black bg-white rounded-lg"
              type="email"
            />
            <Button className="bg-stone-700 text-white hover:bg-stone-600 rounded-lg">
              Join
            </Button>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center mt-16 text-stone-500 border-t border-stone-700 pt-6">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
