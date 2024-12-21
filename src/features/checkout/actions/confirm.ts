import { AxiosError } from "axios";
import { checkoutAxios } from "../lib/axios";

async function confirmCheckout({ orderId }: { orderId: string }) {
  try {
    const response = await checkoutAxios.get(`/confirm/${orderId}`);
    const { data } = response;
    const { message } = data;

    return { message };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      console.log(response);

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon getting product");
  }
}

export { confirmCheckout };
