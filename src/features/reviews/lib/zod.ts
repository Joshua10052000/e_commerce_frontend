import { z } from "zod";

const reviewsQuerySchema = z.object({
  productId: z.string().optional(),
  userId: z.string().optional(),
});

const formSchema = z.object({
  productId: z.string(),
  description: z.string(),
  stars: z.number(),
});

export { reviewsQuerySchema, formSchema };
