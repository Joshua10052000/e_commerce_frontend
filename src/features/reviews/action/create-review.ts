import { AxiosError } from "axios";
import { reviewsAxios } from "../lib/axios";
import { FormSchema } from "../types";

async function createReview({ productId, description, stars }: FormSchema) {
  try {
    const response = await reviewsAxios.post("/", {
      productId,
      description,
      stars,
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

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon creating review");
  }
}

export { createReview };
