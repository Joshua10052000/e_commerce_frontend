import { AxiosError } from "axios";
import { cartAxios } from "../lib/axios";

async function deleteCartitem(id: string) {
  try {
    const response = await cartAxios.delete(`/${id}/`);

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

    throw new Error("Something went wrong upon deleting cart item");
  }
}

export { deleteCartitem };
