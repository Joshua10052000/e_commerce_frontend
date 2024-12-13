import { AxiosError } from "axios";

import { cartAxios } from "@/features/cart/lib/axios";
import { CartResponse } from "@/features/cart/types";

async function getCart() {
  try {
    const response = await cartAxios.get<CartResponse>("/");

    const { data } = response;
    const { cart } = data;

    return { cart };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon getting cart");
  }
}

export { getCart };
