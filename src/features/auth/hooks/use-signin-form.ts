import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SigninSchema } from "@/features/auth/types";
import { signinSchema } from "@/features/auth/lib/zod";

function useSigninForm() {
  const signinForm = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return signinForm;
}

export { useSigninForm };
