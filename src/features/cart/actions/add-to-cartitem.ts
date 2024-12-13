import { AxiosError } from "axios";

import { AddCartitemResponse, AddCartitemSchema } from "@/features/cart/types";
import { cartAxios } from "@/features/cart/lib/axios";

async function addCartitem(inputs: AddCartitemSchema) {
  try {
    const response = await cartAxios.post<AddCartitemResponse>("/", {
      ...inputs,
    });

    const { data } = response;
    const { message } = data;

    return { message };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon signing in");
  }
}

export { addCartitem };
