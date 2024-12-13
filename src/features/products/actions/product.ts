import { AxiosError } from "axios";

import { productsAxios } from "@/features/products/lib/axios";
import { ProductResponse } from "@/features/products/types";
import { productQuery } from "@/features/products/lib/zod";

async function getProduct(id: string) {
  try {
    const { success, error, data: paramsData } = productQuery.safeParse({ id });
    if (!success) {
      throw new Error(error.issues[0].message);
    }

    const response = await productsAxios.get<ProductResponse>(
      `/${paramsData.id}`,
    );

    const { data } = response;
    const { product } = data;

    return { product };
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

export { getProduct };
