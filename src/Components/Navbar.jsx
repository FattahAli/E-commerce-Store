import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import useProducts from "../Hooks/useProducts";
import Cart from "../Pages/Cart";
import useCart from "../Hooks/useCart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { products } = useProducts();
  const { items } = useCart();
  const location = useLocation();

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate total quantity in cart
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // Memoized nav links (removed Products)
  const navLinks = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
    ],
    []
  );

  return (
    <nav className="border-b bg-[#181f2e] relative z-50 w-full">
      <div className="max-w-full mx-auto py-4 px-4 md:px-8 flex flex-wrap items-center justify-between gap-4">
        <Link to={`/`} className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl text-[#ffd700] font-extrabold tracking-wide">
            Swift<span className="text-[#1de9b6]">Cart</span>
          </h1>
        </Link>
        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-col relative w-full max-w-md mx-4">
          <div className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search Items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#232b3b] text-[#f5f7fa] border-[#232b3b]"
            />
          </div>
          {/* Search Suggestions */}
          {search && filteredProducts?.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-[#232b3b] border rounded shadow-md max-h-60 overflow-y-auto mt-2 z-50">
              {filteredProducts.slice(0, 5).map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  onClick={() => setSearch("")}
                  className="flex items-center gap-4 p-2 hover:bg-[#1de9b6]/10"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-sm text-[#f5f7fa]">
                    {product.title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* Nav Links */}
        <div className="hidden md:flex gap-x-6 items-center flex-shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-base md:text-lg font-semibold transition-colors duration-200 px-2 py-1 rounded hover:bg-[#232b3b] hover:text-[#ffd700] ${
                location.pathname === link.path
                  ? "text-[#ffd700]"
                  : "text-[#f5f7fa]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to={`/Cart`} className="relative">
            <ShoppingCart size={26} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#1de9b6] text-[#101624] text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
        {/* Hamburger Icon for Mobile */}
        <Button
          className="md:hidden bg-transparent hover:bg-transparent text-[#ffd700] ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#181f2e] w-full">
          <div className="flex flex-col gap-2 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-lg font-semibold transition-colors duration-200 px-2 py-2 rounded hover:bg-[#232b3b] hover:text-[#ffd700] ${
                  location.pathname === link.path
                    ? "text-[#ffd700]"
                    : "text-[#f5f7fa]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={`/Cart`}
              className="relative"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart size={28} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1de9b6] text-[#101624] text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
          <Input
            type="search"
            placeholder="Search Items"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-2 bg-[#232b3b] text-[#f5f7fa] border-[#232b3b]"
          />
          <Button className="w-full mb-2" variant="outline">
            Search
          </Button>
          {search && filteredProducts?.length > 0 && (
            <div className="bg-[#232b3b] border rounded shadow-md max-h-60 overflow-y-auto">
              {filteredProducts.slice(0, 5).map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  onClick={() => {
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-4 p-2 hover:bg-[#1de9b6]/10"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-sm text-[#f5f7fa]">
                    {product.title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
