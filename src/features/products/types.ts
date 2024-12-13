import { productQuery, productsQuery } from "@/features/products/lib/zod";

type ProductsQuery = Zod.infer<typeof productsQuery>;
type ProductQuery = Zod.infer<typeof productQuery>;

interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  images: string[];

  createdAt: Date;
  updatedAt: Date;
}

interface ProductsResponse {
  products: Product[];
  cursor: string | null;
}

interface ProductResponse {
  product: Product;
}

export type {
  ProductsQuery,
  ProductQuery,
  Product,
  ProductsResponse,
  ProductResponse,
};
