import { AxiosError } from "axios";
import { wishlistAxios } from "../lib/axios";

interface Response {
  message: string;
}

async function createWishlist({ productId }: { productId: string }) {
  try {
    const response = await wishlistAxios.post<Response>("/", { productId });
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

    throw new Error("Something went wrong upon creating wishlist");
  }
}

export { createWishlist };
