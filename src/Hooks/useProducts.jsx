import useSWR from "swr";
import api from "../services/apiServices";

const fetcher = (url) => api.get(url).then((res) => res.data);
const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR("/products", fetcher);
  return { products: data, isLoading, isError: error, refreshProduct: mutate };
};

export default useProducts;
