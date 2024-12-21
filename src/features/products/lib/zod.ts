import { z } from "zod";

const productsQuery = z
  .object({
    "category-name": z.string().optional(),
    "cart-id": z.string().optional(),
    "user-wishlists": z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    cursor: z.string().optional(),
  })
  .strict();

const productQuery = z.object({ id: z.string() });

export { productsQuery, productQuery };
