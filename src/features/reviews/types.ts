import { reviewsQuerySchema } from "@/features/reviews/lib/zod";

type ReviewsQuerySchema = Zod.infer<typeof reviewsQuerySchema>;

interface Review {
  id: string;
  productId: string;
  userId: string;
  description: string;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewsResponse {
  reviews: Review[];
}

export type { ReviewsQuerySchema, ReviewsResponse, Review };