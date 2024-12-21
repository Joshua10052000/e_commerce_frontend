import { AxiosError } from "axios";
import { wishlistAxios } from "../lib/axios";
import { Wishlist } from "../types";

interface Response {
  wishlist: Wishlist | null;
}

async function getWishlist(productId: string) {
  try {
    const response = await wishlistAxios.get<Response>(
      `/product-id/${productId}`,
    );
    const { data } = response;
    const { wishlist } = data;

    return { wishlist };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upong getting wishlist");
  }
}

export { getWishlist };
