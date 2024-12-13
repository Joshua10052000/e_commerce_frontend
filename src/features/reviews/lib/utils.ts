import { Review } from "@/features/reviews/types";

function getAverageStars(reviews: Review[]) {
  const stars = reviews.map((review) => review.stars);

  const averageStars = stars.reduce(
    (previousStar, currentStar) => (previousStar += currentStar),
    0,
  );

  return averageStars;
}

export { getAverageStars };
