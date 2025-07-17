import { useParams } from "react-router-dom";
import api from "../services/apiServices";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Left: Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={`Product ${id}`}
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] object-contain rounded-xl shadow-md"
          />
        </div>

        {/* Right: Product Details */}
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              {product.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              ${product.price}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-gray-800 text-sm md:text-base leading-relaxed">
              {product.description}
            </p>
            <p className="text-sm md:text-base font-medium text-gray-700">
              Rating: {product.rating.rate} / 5
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
