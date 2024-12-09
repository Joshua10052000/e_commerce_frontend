import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignupSchema } from "@/features/auth/types";
import { signupSchema } from "@/features/auth/lib/zod";

function useSignupForm() {
  const signupForm = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  return signupForm;
}

export { useSignupForm };
