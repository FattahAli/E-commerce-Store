import { useParams } from "react-router-dom";
import api from "../services/apiServices";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import useCart from "../Hooks/useCart";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  // Render stars for rating
  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={22}
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

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  if (!product)
    return <p className="text-center mt-10 text-gray-300">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10 min-h-screen flex flex-col items-center justify-center bg-background text-foreground w-full">
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center w-full">
        {/* Left: Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src={product.image}
            alt={`Product ${id}`}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] object-contain rounded-xl shadow-md bg-card max-w-full"
          />
        </div>

        {/* Right: Product Details */}
        <Card className="w-full max-w-xl lg:w-1/2 bg-card border border-[#232b3b] flex flex-col">
          <CardHeader>
            <CardTitle
              className="text-xl sm:text-2xl md:text-3xl text-[#ffd700] truncate"
              title={product.title}
            >
              {product.title}
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-gray-300">
              ${product.price}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed break-words">
              {product.description}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {renderStars(product.rating?.rate || 0)}
              <span className="ml-1 text-xs sm:text-sm text-gray-400">
                {product.rating?.rate ? `${product.rating?.rate}/5` : ""}
                {product.rating?.count
                  ? `, ${product.rating?.count} reviews`
                  : ""}
              </span>
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button
              onClick={handleAddToCart}
              className="w-full py-3 text-lg font-bold bg-[#ffd700] text-[#101624] hover:bg-[#1de9b6] hover:text-[#101624] transition"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
