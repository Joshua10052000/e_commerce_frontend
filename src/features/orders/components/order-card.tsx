import * as React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Order } from "../types";
import { cn } from "@/lib/utils";
import { useOrderItems } from "../hooks/use-order-items";
import { OrderTable } from "./order-table";

const OrderCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card> & { order: Order }
>(({ className, order, ...props }, ref) => {
  const orderItems = useOrderItems({ orderId: order.id });
  const allOrderItems = orderItems.data ? orderItems.data.orderItems : [];

  return (
    <Card className={cn(className)} ref={ref} {...props}>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl">Reference ID</CardTitle>
        <CardDescription>{order.id}</CardDescription>
      </CardHeader>
      <CardContent className="relative mx-auto max-w-[300px] overflow-auto p-4 xs:max-w-full md:p-6">
        <OrderTable orderItems={allOrderItems} totalCents={order.totalCents} />
      </CardContent>
    </Card>
  );
});

export { OrderCard };
