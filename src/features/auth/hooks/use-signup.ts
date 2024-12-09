import { useMutation } from "@tanstack/react-query";

import { signUp } from "@/features/auth/actions/signup";

function useSignup() {
  const signup = useMutation({ mutationFn: signUp });

  return signup;
}

export { useSignup };
