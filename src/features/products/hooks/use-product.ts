import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/features/products/actions/product";

function useProduct(id: string) {
  const product = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
  });

  return product;
}

export { useProduct };
