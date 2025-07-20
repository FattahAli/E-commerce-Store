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
import { useState, useCallback } from "react";
import { Star } from "lucide-react";

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 max-w-7xl mx-auto w-full">
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
          {products.some((p) => (p.category || "").toLowerCase() === "men") && (
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

      {/* Add Product Form */}
      {showAdd && (
        <div className="bg-card border border-[#232b3b] rounded-lg p-6 mb-8 max-w-xl mx-auto flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          />
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
          />
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
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
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
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
          <div className="flex gap-2">
            <Button onClick={handleAdd} variant="primary">
              Add
            </Button>
            <Button
              onClick={() => {
                setShowAdd(false);
                setForm(initialForm);
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Edit Product Form */}
      {showEdit && (
        <div className="bg-card border border-[#232b3b] rounded-lg p-6 mb-8 max-w-xl mx-auto flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          />
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
          />
          <input
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
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
            className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
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
          <div className="flex gap-2">
            <Button onClick={handleEdit} variant="primary">
              Save
            </Button>
            <Button
              onClick={() => {
                setShowEdit(null);
                setForm(initialForm);
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

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
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto mb-12 w-full">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col items-center hover:shadow-lg hover:shadow-[#ffd700]/30 transition duration-300 bg-card border border-[#232b3b] w-full min-w-0"
          >
            <Link to={`/products/${product.id}`} className="w-full">
              <CardHeader className="flex justify-center">
                <img
                  src={product.image}
                  alt={`Product: ${product.title}`}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 object-contain mx-auto rounded-lg"
                />
              </CardHeader>

              <CardTitle
                className="text-[#ffd700] text-center text-base sm:text-lg md:text-xl font-semibold px-2 py-2 leading-tight truncate w-full"
                title={product.title}
              >
                {product.title}
              </CardTitle>

              <CardContent className="flex flex-col gap-2 px-2 sm:px-4 pb-4 text-sm sm:text-base text-gray-300 w-full">
                <p className="truncate" title={product.price}>
                  Price: ${product.price}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {renderStars(product.rating?.rate || 0)}
                  <span className="ml-1 text-xs sm:text-sm text-gray-400">
                    {product.rating?.rate ? `${product.rating?.rate}` : ""}
                    {product.rating?.count
                      ? ` (${product.rating?.count} reviews)`
                      : ""}
                  </span>
                </div>
              </CardContent>
            </Link>
            <CardFooter className="flex flex-col sm:flex-row gap-2 w-full justify-between items-center px-2 sm:px-4 pb-2">
              <Button
                variant="outline"
                onClick={() => handleAddToCart(product)}
                className="w-full sm:w-auto"
              >
                Add to cart
              </Button>
              <Button
                variant="secondary"
                onClick={() => startEdit(product)}
                className="w-full sm:w-auto"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(product.id)}
                className="w-full sm:w-auto"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductList;
