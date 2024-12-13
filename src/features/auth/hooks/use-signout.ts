import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "@/features/auth/actions/signout";

function useSignout() {
  const queryClient = useQueryClient();
  const signout = useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });

  return signout;
}

export { useSignout };
