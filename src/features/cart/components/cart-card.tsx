import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { CartItem } from "@/features/cart/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MinusCircleIcon, PlusCircleIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUpdateCartitem } from "../hooks/use-update-cartitem";
import { formatCents } from "@/features/products/lib/utils";
import { useDeleteCartitem } from "../hooks/use-delete-cartitem";
import { useProduct } from "@/features/products/hooks/use-product";
import { Skeleton } from "@/components/ui/skeleton";

interface CartCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  cartItem: CartItem;
}

const CartCard = React.forwardRef<React.ElementRef<typeof Card>, CartCardProps>(
  ({ className, cartItem, ...props }, ref) => {
    const product = useProduct(cartItem.productId);
    const updateCartitem = useUpdateCartitem();
    const deleteCartItem = useDeleteCartitem();

    return (
      <Card className={cn("h-fit", className)} ref={ref} {...props}>
        <CardHeader className="relative p-0">
          <Button
            onClick={() => deleteCartItem.mutate(cartItem.id)}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="size-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex gap-6 p-4">
          <div className="max-w-52">
            <img
              src={product.data?.product?.images[0]}
              alt={product.data?.product?.name}
              className="max-h-full max-w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-2">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {product.data?.product?.name}
              </h3>
              <p
                className="line-clamp-3 text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: product.data?.product?.description || "",
                }}
              ></p>
              <div className="text-lg font-bold">
                ${formatCents(product.data?.product?.priceCents || 0)}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                onClick={() =>
                  cartItem.quantity <= 1
                    ? null
                    : updateCartitem.mutate({
                        id: cartItem.id,
                        inputs: { quantity: cartItem.quantity - 1 },
                      })
                }
                size="icon"
                variant="ghost"
              >
                <MinusCircleIcon />
              </Button>
              <Input
                min={1}
                type="number"
                value={cartItem.quantity}
                onChange={(e) => {
                  let value = parseInt(e.target.value);

                  if (isNaN(value)) {
                    value = 1;
                  }

                  updateCartitem.mutate({
                    id: cartItem.id,
                    inputs: { quantity: value <= 0 ? 1 : value },
                  });
                }}
                className="w-auto max-w-10 px-1 text-center [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  updateCartitem.mutate({
                    id: cartItem.id,
                    inputs: { quantity: cartItem.quantity + 1 },
                  })
                }
              >
                <PlusCircleIcon />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);

const CartCardSkeleton = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, children, ...props }, ref) => {
  return (
    <Card className={cn(className)} ref={ref} {...props}>
      <CardHeader className="relative p-0">
        <Skeleton className="absolute right-4 top-4 h-6 w-6 rounded-full" />
      </CardHeader>
      <CardContent className="flex gap-6 p-4">
        <div className="max-w-52">
          <Skeleton className="size-52 rounded-md" />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-3 w-5/6 rounded-md" />
            <Skeleton className="h-5 w-1/3 rounded-md" />
          </div>
          <CardFooter className="gap-2 p-4 pt-0">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-8 w-12 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
});

export { CartCard, CartCardSkeleton };
