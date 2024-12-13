import {
  addCartitemSchema,
  updateCartitemSchema,
} from "@/features/cart/lib/zod";

type AddCartitemSchema = Zod.infer<typeof addCartitemSchema>;
type UpdateCartitemSchema = Zod.infer<typeof updateCartitemSchema>;

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Cart {
  id: string;
  userId: string;
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface CartResponse {
  cart: Cart;
}

interface AddCartitemResponse {
  message: string;
}

export type {
  AddCartitemSchema,
  UpdateCartitemSchema,
  CartItem,
  Cart,
  CartResponse,
  AddCartitemResponse,
};
