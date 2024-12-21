import { useQuery } from "@tanstack/react-query";
import { getUser } from "../actions/get-user";

function useUser(userId: string) {
  const user = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
  });

  return user;
}

export { useUser };
