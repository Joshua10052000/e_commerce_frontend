interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  totalCents: number;
}

interface OrderItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  productId: string;
  quantity: number;
}

export type { Order, OrderItem };
