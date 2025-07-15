import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navlinks = [
    { name: "Home", href: "#" },
    { name: "All Products", href: "#all-products" },
    { name: "Contact Us", href: "#contact-us" },
    { name: "About Us", href: "#about-us" },
  ];
  return (
    <nav className="bg-gray-300">
      <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">SwiftCart</h1>
        <ul className="hidden md:flex space-x-6">
          {navlinks.map((link) => (
            <li key={link.name}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex gap-x-2">
          <User />
          <ShoppingCart />
        </div>
        {/* Mobile nav starts from here */}

        <Button
          className="md:hidden bg-transparent hover:bg-transparent text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {isOpen && (
        <ul className="md:hidden space-y-2 px-4 pb-4">
          {navlinks.map((link) => (
            <li key={link.name}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
