import { useQuery } from "@tanstack/react-query";
import { getOrderItems } from "../actions/get-order-items";

function useOrderItems({ orderId }: { orderId: string }) {
  const orderItems = useQuery({
    queryKey: ["orders", "order-items", orderId],
    queryFn: () => getOrderItems({ orderId }),
  });

  return orderItems;
}

export { useOrderItems };
