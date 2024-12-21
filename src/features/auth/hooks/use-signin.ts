import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn } from "@/features/auth/actions/signin";

function useSignin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signin = useMutation({
    mutationFn: signIn,
    onSuccess: async ({ user }) => {
      await queryClient.cancelQueries({ queryKey: ["session"] });

      queryClient.setQueryData(["session"], () => {
        return { user };
      });

      navigate("/");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  return signin;
}

export { useSignin };
