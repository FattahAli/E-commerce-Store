import useCart from "../Hooks/useCart";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, addToCart, removeFromCart, decreaseQuantity } = useCart();

  // Calculate totals
  const productsAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingTotal = items.length > 0 ? 10 : 0; // Flat shipping for demo
  const total = productsAmount + shippingTotal;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-screen bg-background text-foreground w-full">
      {/* Cart Items */}
      <div className="lg:col-span-2 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left">
          Shopping Cart
        </h2>
        {items.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#232b3b] p-4 rounded-lg shadow-sm hover:shadow-lg transition bg-card w-full min-w-0"
              >
                <div className="flex items-center gap-4 w-full min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4
                      className="font-semibold text-base sm:text-lg truncate"
                      title={item.title}
                    >
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm sm:text-base">
                      ${item.price}
                    </p>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Minus size={18} />
                  </Button>

                  <span className="font-medium text-base sm:text-lg">
                    {item.quantity}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Plus size={18} />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Summary */}
      <div className="bg-card border border-[#232b3b] rounded-lg shadow-md p-4 sm:p-6 h-fit flex flex-col gap-4 w-full max-w-md mx-auto lg:mx-0">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
          Order Summary
        </h3>
        <div className="flex justify-between text-gray-300 text-sm sm:text-base">
          <span>Products Amount</span>
          <span>${productsAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm sm:text-base">
          <span>Shipping</span>
          <span>${shippingTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base sm:text-lg mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link to="/checkout">
          <Button className="w-full mt-4 sm:mt-6" disabled={items.length === 0}>
            Go to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
