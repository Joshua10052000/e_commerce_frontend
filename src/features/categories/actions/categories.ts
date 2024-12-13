import { AxiosError } from "axios";

import { categoryAxios } from "@/features/categories/lib/axios";
import { CategoryResponse } from "@/features/categories/types";

async function getCategories() {
  try {
    const response = await categoryAxios.get<CategoryResponse>("/");

    const { data } = response;
    const { categories } = data;

    return { categories };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon getting categories");
  }
}

export { getCategories };
