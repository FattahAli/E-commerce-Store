import { useCallback, useEffect } from "react";
import { create } from "zustand";
import api from "../services/apiServices";

const useProductsStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

const useProducts = () => {
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);

  // Fetch products from API on first load
  useEffect(() => {
    if (products.length === 0) {
      api.get("/products").then((res) => {
        setProducts(res.data);
      });
    }
  }, [products.length, setProducts]);

  // Add product
  const addProduct = useCallback(
    (product) => {
      setProducts([...products, { ...product, id: Date.now() }]);
    },
    [products, setProducts]
  );

  // Edit product
  const editProduct = useCallback(
    (id, updated) => {
      setProducts(
        products.map((p) => (p.id === id ? { ...p, ...updated } : p))
      );
    },
    [products, setProducts]
  );

  // Delete product
  const deleteProduct = useCallback(
    (id) => {
      setProducts(products.filter((p) => p.id !== id));
    },
    [products, setProducts]
  );

  return { products, addProduct, editProduct, deleteProduct };
};

export default useProducts;
