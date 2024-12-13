import { AxiosError } from "axios";

import { UpdateCartitemSchema } from "@/features/cart/types";
import { updateCartitemSchema } from "@/features/cart/lib/zod";
import { cartAxios } from "@/features/cart/lib/axios";

async function updateCartitem(id: string, inputs: UpdateCartitemSchema) {
  try {
    const {
      success,
      error,
      data: updateCartitemData,
    } = updateCartitemSchema.safeParse(inputs);

    if (!success) {
      throw new Error(error.issues[0].message);
    }

    const response = await cartAxios.put(`/${id}/`, {
      ...updateCartitemData,
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
        console.log(message);

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon updating cart item");
  }
}

export { updateCartitem };
