import { AxiosError } from "axios";
import { wishlistAxios } from "../lib/axios";
import { Wishlist } from "../types";

interface Response {
  wishlists: Wishlist[];
}

async function getWishlists() {
  try {
    const response = await wishlistAxios.get<Response>(`/`);
    const { data } = response;
    const { wishlists } = data;

    return { wishlists };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon getting wishlists");
  }
}

export { getWishlists };
