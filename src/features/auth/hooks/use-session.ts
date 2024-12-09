import { useQuery } from "@tanstack/react-query";

import { getSession } from "@/features/auth/actions/session";

function useSession() {
  const session = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  return session;
}

export { useSession };
