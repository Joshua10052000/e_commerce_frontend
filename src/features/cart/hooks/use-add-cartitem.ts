import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addCartitem } from "@/features/cart/actions/add-to-cartitem";
import { Cart } from "../types";
import { useToast } from "@/hooks/use-toast";

function useAddToCart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const addtoCart = useMutation({
    mutationFn: addCartitem,
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]) as Cart;

      queryClient.setQueryData(["cart"], ({ cart }: { cart: Cart }) => {
        const newCartItems = cart.cartItems.some(
          (cartItem) => cartItem.productId === productId,
        )
          ? cart.cartItems.map((cartItem) =>
              cartItem.productId === productId
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem,
            )
          : [
              ...cart.cartItems,
              {
                id: Math.random().toString(),
                cartId: cart.id,
                productId,
                quantity,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ];

        const newCart = { ...cart, cartItems: newCartItems };

        return { cart: newCart };
      });

      return { previousCart };
    },
    onError: (error, _, context) => {
      toast({ title: error.name, description: error.message });
      queryClient.setQueryData(["cart"], context?.previousCart);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return addtoCart;
}

export { useAddToCart };
