import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlist } from "../actions/create-wishlist";
import { Wishlist } from "../types";
import { useToast } from "@/hooks/use-toast";

function useCreateWishlist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWishlist,
    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlists"] });
      await queryClient.cancelQueries({ queryKey: ["wishlists", productId] });
      const previousWishlists = queryClient.getQueryData([
        "wishlists",
      ]) as Wishlist[];
      const previousWishlist = queryClient.getQueryData([
        "wishlists",
        productId,
      ]) as Wishlist;

      queryClient.setQueryData(
        ["wishlists"],
        ({ wishlists }: { wishlists: Wishlist[] }) => {
          const wishlist: Wishlist = {
            id: Math.random().toString(),
            productId,
            userId: Math.random().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const newWishlist = [...wishlists, wishlist];

          return { wishlists: newWishlist };
        },
      );

      queryClient.setQueryData(["wishlists", productId], () => {
        return {
          wishlist: {
            id: Math.random().toString(),
            productId,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: Math.random().toString(),
          },
        };
      });

      return { previousWishlists, previousWishlist };
    },
    onError: (error, { productId }, context) => {
      toast({ title: error.name, description: error.message });
      queryClient.setQueryData(["wishlists"], context?.previousWishlists);
      queryClient.setQueryData(
        ["wishlists", productId],
        context?.previousWishlists,
      );
    },
    onSettled: async (_, __, { productId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["wishlists", productId],
      });
      await queryClient.invalidateQueries({ queryKey: ["wishlists"] });
    },
  });
}

export { useCreateWishlist };
