import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCents } from "@/features/products/lib/utils";
import { useCart } from "../hooks/use-cart";
import { cn } from "@/lib/utils";
import { useProducts } from "@/features/products/hooks/use-products";
import { useCreateCheckout } from "@/features/checkout/hooks/use-create-checkout";

const CartSummaryCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, ...props }, ref) => {
  const cart = useCart();
  const products = useProducts();
  const createCheckout = useCreateCheckout();
  const cartItems = cart.data ? cart.data.cart.cartItems : [];
  const allProducts = products.data
    ? products.data.pages.flatMap((p) => p.products)
    : [];

  const subTotal = cartItems.reduce((pr, cr) => {
    const foundProduct = allProducts.find(
      (product) => product.id === cr.productId,
    );

    if (!foundProduct) {
      return pr;
    }

    return (pr += foundProduct.priceCents * cr.quantity);
  }, 0);

  React.useEffect(() => {
    if (products.hasNextPage) {
      products.fetchNextPage();
    }
  }, [
    products.data,
    products.isSuccess,
    products.hasNextPage,
    products.fetchNextPage,
  ]);

  return (
    <Card className={cn(className)} ref={ref} {...props}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          Review your items and proceed to checkout. Ensure your order details
          are correct before confirming.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-semibold">
            {cartItems.length <= 0 ? "Item" : "Item(s)"}:
          </span>
          <span className="font-bold">
            {cartItems.length}
            {cartItems.length <= 1 ? " product" : " products"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Sub total:</span>
          <span className="font-bold">${formatCents(subTotal)}</span>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <Button
          disabled={cartItems.length <= 0 || createCheckout.isPending}
          onClick={() => createCheckout.mutate()}
          className="w-full"
        >
          Checkout now
        </Button>
      </CardFooter>
    </Card>
  );
});

export { CartSummaryCard };
