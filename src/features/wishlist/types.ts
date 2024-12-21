interface Wishlist {
  id: string;
  userId: string;
  productId: string;

  createdAt: Date;
  updatedAt: Date;
}

export type { Wishlist };
