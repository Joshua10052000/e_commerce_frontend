import { z } from "zod";

const addCartitemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

const updateCartitemSchema = z.object({
  quantity: z.number(),
});

export { addCartitemSchema, updateCartitemSchema };
