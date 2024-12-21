import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlist } from "../actions/delete-wishlist";
import { Wishlist } from "../types";
import { useToast } from "@/hooks/use-toast";

function useDeleteWishlist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWishlist,
    onMutate: async ({ wishlistId }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlists"] });
      const previousWishlists = queryClient.getQueryData(["wishlists"]) as {
        wishlists: Wishlist[];
      };
      const foundWishlist = previousWishlists.wishlists.find(
        (wishlist) => wishlist.id === wishlistId,
      );
      await queryClient.cancelQueries({
        queryKey: ["wishlists", foundWishlist?.productId],
      });
      const previousWishlist = queryClient.getQueryData([
        "wishlists",
        foundWishlist?.productId,
      ]) as { wishlist: Wishlist };

      queryClient.setQueryData(
        ["wishlists"],
        ({ wishlists }: { wishlists: Wishlist[] }) => {
          const newWishlists = wishlists.filter(
            (wishlist) => wishlist.id !== wishlistId,
          );

          return { wishlists: newWishlists };
        },
      );

      queryClient.setQueryData(["wishlists", foundWishlist?.productId], () => {
        return { wishlist: null };
      });

      return { previousWishlists, previousWishlist, foundWishlist };
    },
    onError: (error, _, context) => {
      toast({ title: error.name, description: error.message });
      queryClient.setQueryData(["wishlists"], context?.previousWishlists);
      queryClient.setQueryData(
        ["wishlists", context?.foundWishlist?.productId],
        context?.previousWishlist,
      );
    },
    onSettled: async (_, __, ___, ctx) => {
      await queryClient.invalidateQueries({
        queryKey: ["wishlists", ctx?.foundWishlist?.productId],
      });
      await queryClient.invalidateQueries({ queryKey: ["wishlists"] });
    },
  });
}

export { useDeleteWishlist };
