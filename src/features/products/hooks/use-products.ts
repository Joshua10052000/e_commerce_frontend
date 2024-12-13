import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "@/features/products/actions/products";

function useProducts(query?: Record<string, unknown>) {
  const fetchProducts = async ({ pageParam }: { pageParam: string }) => {
    const response = await getProducts({
      ...query,
      limit: "50",
      cursor: pageParam,
    });

    return response;
  };

  const products = useInfiniteQuery({
    queryKey: ["products", query],
    queryFn: fetchProducts,
    getNextPageParam: ({ cursor }) => cursor,
    initialPageParam: "",
  });

  return products;
}

export { useProducts };
