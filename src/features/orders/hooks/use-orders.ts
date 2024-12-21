import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../actions/get-orders";

function useOrders() {
  const orders = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  return orders;
}

export { useOrders };
