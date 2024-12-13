import { AxiosError } from "axios";

import { productsAxios } from "@/features/products/lib/axios";
import { ProductsResponse } from "@/features/products/types";
import { productsQuery } from "@/features/products/lib/zod";

async function getProducts(query: Record<string, unknown> = {}) {
  try {
    const { success, error, data: queryData } = productsQuery.safeParse(query);

    if (!success) {
      throw new Error(error.issues[0].message);
    }

    const params = new URLSearchParams(queryData);

    const response = await productsAxios.get<ProductsResponse>(
      `/${params && `?${params.toString()}`}`,
    );

    const { data } = response;
    const { products, cursor } = data;

    return { products, cursor };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon getting products");
  }
}

export { getProducts };
