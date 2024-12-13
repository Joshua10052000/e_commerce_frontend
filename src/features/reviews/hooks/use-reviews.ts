import { useQuery } from "@tanstack/react-query";

import { getReviews } from "@/features/reviews/action/reviews";
import { ReviewsQuerySchema } from "@/features/reviews/types";

function useReviews(query?: ReviewsQuerySchema) {
  const reviews = useQuery({
    queryKey: ["reviews", query],
    queryFn: () => getReviews(query),
  });

  return reviews;
}

export { useReviews };
