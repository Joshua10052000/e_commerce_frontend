import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/features/cart/actions/cart";

function useCart() {
  const cart = useQuery({ queryKey: ["cart"], queryFn: getCart });

  return cart;
}

export { useCart };
