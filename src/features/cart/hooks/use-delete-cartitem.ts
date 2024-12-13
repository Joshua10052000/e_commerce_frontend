import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartitem } from "../actions/delete-cartitem";
import { Cart } from "../types";
import { useToast } from "@/hooks/use-toast";

function useDeleteCartitem() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const deleteCartItem = useMutation({
    mutationFn: deleteCartitem,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]) as Cart;

      await queryClient.setQueryData(["cart"], ({ cart }: { cart: Cart }) => {
        const newCartItems = cart.cartItems.filter(
          (cartItem) => cartItem.id !== id,
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

  return deleteCartItem;
}

export { useDeleteCartitem };
