import { AxiosError } from "axios";

import { reviewsAxios } from "@/features/reviews/lib/axios";
import { ReviewsQuerySchema, ReviewsResponse } from "@/features/reviews/types";

async function getReviews(query?: ReviewsQuerySchema) {
  try {
    const response = await reviewsAxios.get<ReviewsResponse>(
      `/?productId=${query?.productId}&userId=${query?.userId}`,
    );

    const { data } = response;
    const { reviews } = data;

    return { reviews };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon getting reviews");
  }
}

export { getReviews };
