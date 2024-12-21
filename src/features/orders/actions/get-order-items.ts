import { AxiosError } from "axios";
import { orderAxios } from "../lib/axios";
import { OrderItem } from "../types";

interface Response {
  orderItems: OrderItem[];
}

async function getOrderItems({ orderId }: { orderId: string }) {
  try {
    const response = await orderAxios.get<Response>(
      `/order-items/order-id/${orderId}`,
    );
    const { data } = response;
    const { orderItems } = data;

    return { orderItems };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon getting orders");
  }
}

export { getOrderItems };
