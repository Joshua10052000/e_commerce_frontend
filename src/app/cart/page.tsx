import {
  CartCard,
  CartCardSkeleton,
} from "@/features/cart/components/cart-card";
import { useCart } from "@/features/cart/hooks/use-cart";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { CartSummaryCard } from "@/features/cart/components/cart-summary-card";

const CartPage = () => {
  const cart = useCart();
  const allCartitems = cart.data ? cart.data.cart.cartItems : [];

  return (
    <section className="container mx-auto">
      <div className="flex justify-between gap-2">
        <ScrollArea className="max-h-[768px] w-full px-3">
          <div className="grid flex-1 gap-4">
            {cart.isPending
              ? Array.from({ length: 5 }, (_, i) => (
                  <CartCardSkeleton key={i} />
                ))
              : allCartitems.map((cartItem) => (
                  <CartCard cartItem={cartItem} key={cartItem.id} />
                ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <div className="col-span-1 w-full max-w-sm">
          <CartSummaryCard />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
