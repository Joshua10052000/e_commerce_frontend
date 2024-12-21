import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../actions/get-wishlist";

function useWishlist(productId: string) {
  const wishlist = useQuery({
    queryKey: ["wishlists", productId],
    queryFn: () => getWishlist(productId),
  });

  return wishlist;
}

export { useWishlist };
