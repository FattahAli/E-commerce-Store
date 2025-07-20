import { create } from "zustand";
import { useCallback, useMemo } from "react";
import cartService from "../services/cartService";

const useCartStore = create((set) => ({
  items: cartService.getCart(),
  setItems: (items) => set({ items }),
}));

const useCart = () => {
  const items = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);

  // Add to cart
  const addToCart = useCallback(
    (product) => {
      const newCart = cartService.addItem(product);
      setItems(newCart);
    },
    [setItems]
  );

  // Remove from cart
  const removeFromCart = useCallback(
    (id) => {
      const newCart = cartService.removeItem(id);
      setItems(newCart);
    },
    [setItems]
  );

  // Decrease quantity
  const decreaseQuantity = useCallback(
    (id) => {
      const item = items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        const newCart = cartService.updateQuantity(id, item.quantity - 1);
        setItems(newCart);
      } else {
        removeFromCart(id);
      }
    },
    [items, setItems, removeFromCart]
  );

  // Clear cart
  const clearCart = useCallback(() => {
    cartService.clearCart();
    setItems([]);
  }, [setItems]);

  // Total price
  const total = useMemo(() => cartService.getTotal(), [items]);

  return {
    items,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    total,
  };
};

export default useCart;
