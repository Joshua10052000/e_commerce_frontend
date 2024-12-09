import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { signIn } from "@/features/auth/actions/signin";

function useSignin() {
  const navigate = useNavigate();
  const signin = useMutation({
    mutationFn: signIn,
    onSuccess: () => navigate("/"),
  });

  return signin;
}

export { useSignin };
