import { z } from "zod";

const reviewsQuerySchema = z.object({
  productId: z.string().optional(),
  userId: z.string().optional(),
});

export { reviewsQuerySchema };
