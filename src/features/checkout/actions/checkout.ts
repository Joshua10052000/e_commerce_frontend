import { AxiosError } from "axios";
import { checkoutAxios } from "../lib/axios";
import { CreateCheckoutServerResponse } from "../types";

async function createCheckout() {
  try {
    const response =
      await checkoutAxios.post<CreateCheckoutServerResponse>("/create");

    const { data } = response;
    const { link } = data;

    return { link };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon getting product");
  }
}

export { createCheckout };
