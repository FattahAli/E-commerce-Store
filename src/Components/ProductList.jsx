import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import useCart from "../Hooks/useCart";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useCallback } from "react";
import { Star, MoreVertical } from "lucide-react";

const initialForm = {
  title: "",
  price: "",
  image: "",
  rating: { rate: 0, count: 0 },
  category: "",
};

const ProductList = () => {
  const { addToCart } = useCart();
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const [filter, setFilter] = useState(false);
  const [category, setCategory] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [menuOpenId, setMenuOpenId] = useState(null);

  // Add to cart handler with toast
  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
      toast.success(`${product.title} added to cart!`);
    },
    [addToCart]
  );

  // Add product
  const handleAdd = useCallback(() => {
    if (!form.title || !form.price)
      return toast.error("Title and price required");
    addProduct({
      ...form,
      price: parseFloat(form.price),
      rating: {
        rate: Number(form.rating.rate),
        count: Number(form.rating.count),
      },
    });
    setForm(initialForm);
    setShowAdd(false);
    toast.success("Product added!");
  }, [form, addProduct]);

  // Edit product
  const handleEdit = useCallback(() => {
    if (!form.title || !form.price)
      return toast.error("Title and price required");
    editProduct(showEdit, {
      ...form,
      price: parseFloat(form.price),
      rating: {
        rate: Number(form.rating.rate),
        count: Number(form.rating.count),
      },
    });
    setForm(initialForm);
    setShowEdit(null);
    toast.success("Product updated!");
  }, [form, editProduct, showEdit]);

  // Start edit
  const startEdit = useCallback((product) => {
    setShowEdit(product.id);
    setForm({
      ...product,
      price: String(product.price),
      rating: {
        rate: product.rating?.rate || 0,
        count: product.rating?.count || 0,
      },
    });
  }, []);

  // Delete product
  const handleDelete = useCallback(
    (id) => {
      deleteProduct(id);
      toast.success("Product deleted!");
    },
    [deleteProduct]
  );

  // Dropdown menu handler
  const handleMenuToggle = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  // Filtered products
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={
            i <= Math.round(rate)
              ? "fill-[#ffd700] text-[#ffd700]"
              : "text-gray-500"
          }
          fill={i <= Math.round(rate) ? "#ffd700" : "none"}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Our Products
          </h2>
          <div className="flex flex-wrap gap-2 max-w-full">
            <Button
              variant="secondary"
              onClick={() => setShowAdd((v) => !v)}
              className="whitespace-nowrap"
            >
              + Add Product
            </Button>
            <Button
              variant="outline"
              onClick={() => setFilter(!filter)}
              className="whitespace-nowrap"
            >
              Filter by Categories
            </Button>
            {/* Men category button if present */}
            {products.some(
              (p) => (p.category || "").toLowerCase() === "men"
            ) && (
              <Button
                variant={category === "men" ? "default" : "outline"}
                onClick={() => setCategory(category === "men" ? "" : "men")}
                className="whitespace-nowrap"
              >
                Men
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <div
            className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm mx-auto p-2 sm:p-4 overflow-y-auto"
            style={{ maxHeight: "70vh" }}
          >
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: e.target.value }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Rating (0-5)"
              type="number"
              min="0"
              max="5"
              value={form.rating.rate}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  rating: { ...f.rating, rate: e.target.value },
                }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Reviews Count"
              type="number"
              min="0"
              value={form.rating.count}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  rating: { ...f.rating, count: e.target.value },
                }))
              }
            />
            <div className="flex gap-2 w-full">
              <Button onClick={handleAdd} variant="primary" className="w-full">
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={!!showEdit}
        onOpenChange={(open) => {
          if (!open) {
            setShowEdit(null);
            setForm(initialForm);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div
            className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm mx-auto p-2 sm:p-4 overflow-y-auto"
            style={{ maxHeight: "70vh" }}
          >
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: e.target.value }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Rating (0-5)"
              type="number"
              min="0"
              max="5"
              value={form.rating.rate}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  rating: { ...f.rating, rate: e.target.value },
                }))
              }
            />
            <input
              className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground w-full"
              placeholder="Reviews Count"
              type="number"
              min="0"
              value={form.rating.count}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  rating: { ...f.rating, count: e.target.value },
                }))
              }
            />
            <div className="flex gap-2 w-full">
              <Button onClick={handleEdit} variant="primary" className="w-full">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category filter options */}
      {filter && (
        <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-4xl mx-auto w-full">
          {[...new Set(products.map((product) => product.category))].map(
            (cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                onClick={() => setCategory(cat === category ? "" : cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            )
          )}
        </div>
      )}

      {/* Product grid */}
      <div
        id="product-list"
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto mb-12 w-full"
      >
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col items-center hover:shadow-lg hover:shadow-[#ffd700]/30 transition duration-300 bg-white text-[#181f2e] border border-[#e5e7eb] w-full min-w-0"
          >
            <div className="relative w-full">
              <Link to={`/products/${product.id}`} className="w-full block">
                <CardHeader className="flex justify-center bg-white">
                  <img
                    src={product.image}
                    alt={`Product: ${product.title}`}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-contain mx-auto rounded-lg"
                  />
                </CardHeader>
                {/* 3-dots menu icon overlay */}
                <button
                  type="button"
                  className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMenuToggle(product.id);
                  }}
                >
                  <MoreVertical size={22} />
                </button>
              </Link>
              {/* Dropdown menu */}
              {menuOpenId === product.id && (
                <div className="absolute top-10 right-2 z-20 bg-white border border-gray-200 rounded shadow-md min-w-[120px] flex flex-col">
                  <button
                    className="px-4 py-2 text-left hover:bg-gray-100 text-[#181f2e]"
                    onClick={() => {
                      startEdit(product);
                      setMenuOpenId(null);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 text-left hover:bg-gray-100 text-[#e53935]"
                    onClick={() => {
                      handleDelete(product.id);
                      setMenuOpenId(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <CardTitle
              className="text-[#181f2e] text-left text-base sm:text-lg md:text-xl font-semibold px-2 sm:px-4 py-2 leading-relaxed w-full line-clamp-2 overflow-hidden"
              title={product.title}
            >
              {product.title}
            </CardTitle>
            <CardContent className="flex flex-col gap-2 px-2 sm:px-4 pb-4 text-sm sm:text-base text-[#181f2e] w-full">
              <p className="truncate text-xl font-bold" title={product.price}>
                ${product.price}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {renderStars(product.rating?.rate || 0)}
                <span className="ml-1 text-xs sm:text-sm text-[#181f2e]">
                  {product.rating?.rate ? `${product.rating?.rate}` : ""}
                  {product.rating?.count
                    ? ` (${product.rating?.count} reviews)`
                    : ""}
                </span>
              </div>
            </CardContent>
            {/* Add to Cart Button */}
            <div className="w-full px-2 sm:px-4 pb-4">
              <Button
                variant="outline"
                onClick={() => handleAddToCart(product)}
                className="w-full text-[#ffd700]"
              >
                Add to cart
              </Button>
            </div>
            <CardFooter className="hidden" />
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductList;
