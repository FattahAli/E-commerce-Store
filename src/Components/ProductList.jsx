import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
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
import { useState } from "react";

const ProductList = () => {
  const { products, isLoading, isError } = useProducts();
  const [filter, setFilter] = useState(false);
  const [category, setCategory] = useState("");

  if (isLoading) return <p className="text-center mt-10">Loading data...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error fetching products.</p>
    );

  // Filtered products
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <>
      <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold my-10">
        Our Products
      </h2>

      {/* Filter button */}
      <div className="flex justify-center my-8">
        <Button variant="outline" onClick={() => setFilter(!filter)}>
          Filter by Categories
        </Button>
      </div>

      {/* Category filter options */}
      {filter && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[...new Set(products.map((product) => product.category))].map(
            (cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                onClick={() => setCategory(cat === category ? "" : cat)}
              >
                {cat}
              </Button>
            )
          )}
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-12 max-w-screen-xl mx-auto mb-12">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col items-center hover:shadow-lg hover:shadow-[#2EC4B6] transition duration-300"
          >
            <Link to={`/products/${product.id}`} className="w-full">
              <CardHeader className="flex justify-center">
                <img
                  src={product.image}
                  alt={`Product: ${product.title}`}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 object-contain mx-auto"
                />
              </CardHeader>

              <CardTitle className="text-[#011627] text-center text-sm sm:text-base font-semibold px-4 py-4 leading-tight">
                {product.title}
              </CardTitle>

              <CardContent className="flex justify-between px-4 pb-6 text-sm sm:text-base text-gray-700">
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating.rate}</p>
              </CardContent>
            </Link>
            <CardFooter>
              <Button variant="outline">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductList;
