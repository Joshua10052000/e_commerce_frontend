import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartitem } from "../actions/update-cartitem";
import { Cart, UpdateCartitemSchema } from "../types";
import { useToast } from "@/hooks/use-toast";

function useUpdateCartitem() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateCartItem = useMutation({
    mutationFn: ({
      id,
      inputs,
    }: {
      id: string;
      inputs: UpdateCartitemSchema;
    }) => updateCartitem(id, inputs),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onMutate: async ({ id, inputs }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData(["cart"]) as Cart;

      queryClient.setQueryData(["cart"], ({ cart }: { cart: Cart }) => {
        const newCartItems = cart.cartItems.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: inputs.quantity }
            : cartItem,
        );

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

  return updateCartItem;
}

export { useUpdateCartitem };
