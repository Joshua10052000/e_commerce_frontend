import { AxiosError } from "axios";

import { authAxios } from "@/features/auth/lib/axios";
import { SigninResponse, SigninSchema } from "@/features/auth/types";

async function signIn(inputs: SigninSchema) {
  try {
    const response = await authAxios.post<SigninResponse>("/signin", {
      ...inputs,
    });

    const { data } = response;
    const { message, user } = data;

    return { message, user };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon signing in");
  }
}

export { signIn };
