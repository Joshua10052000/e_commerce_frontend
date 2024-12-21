import { useQuery } from "@tanstack/react-query";
import { getWishlists } from "../actions/get-wishlists";

function useWishlists() {
  const wishlists = useQuery({
    queryKey: ["wishlists"],
    queryFn: getWishlists,
  });

  return wishlists;
}

export { useWishlists };
