import { AxiosError } from "axios";
import { orderAxios } from "../lib/axios";
import { Order } from "../types";

interface Response {
  orders: Order[];
}

async function getOrders() {
  try {
    const response = await orderAxios.get<Response>("/");
    const { data } = response;
    const { orders } = data;

    return { orders };
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

export { getOrders };
