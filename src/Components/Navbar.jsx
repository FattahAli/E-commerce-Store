import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import useProducts from "../Hooks/useProducts";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { products } = useProducts();

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <nav className="border-b bg-[#FDFFFC] relative z-50">
      <div className="max-w-[1400px] mx-auto py-7 px-4 flex items-center justify-between">
        <Link to={`/`}>
          <h1 className="text-2xl text-[#011627] font-bold">
            Swift<span className="text-[#2EC4B6]">Cart</span>
          </h1>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-col relative w-[400px]">
          <div className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search Items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Search Suggestions */}
          {search && filteredProducts?.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded shadow-md max-h-60 overflow-y-auto mt-2 z-50">
              {filteredProducts.slice(0, ).map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  onClick={() => setSearch("")}
                  className="flex items-center gap-4 p-2 hover:bg-gray-100"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-sm text-[#011627]">{product.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-x-2 text-[#2EC4B6]">
          <User />
          <ShoppingCart />
        </div>

        {/* Hamburger Icon for Mobile */}
        <Button
          className="md:hidden bg-transparent hover:bg-transparent text-[#2EC4B6]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Search */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Input
            type="search"
            placeholder="Search Items"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-2"
          />
          <Button className="w-full mb-2" variant="outline">
            Search
          </Button>

          {search && filteredProducts?.length > 0 && (
            <div className="bg-white border rounded shadow-md max-h-60 overflow-y-auto">
              {filteredProducts.slice(0, 5).map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  onClick={() => {
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-4 p-2 hover:bg-gray-100"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-sm text-[#011627]">{product.title}</span>
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
