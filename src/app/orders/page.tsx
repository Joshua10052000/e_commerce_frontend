import { OrderCard } from "@/features/orders/components/order-card";
import { useOrders } from "@/features/orders/hooks/use-orders";

const OrdersPage = () => {
  const orders = useOrders();
  const allOrders = orders.data ? orders.data.orders : [];

  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Browse your order history here!
        </p>
      </div>
      <div className="grid gap-6">
        {allOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
