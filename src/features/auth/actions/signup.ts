import { AxiosError } from "axios";

import { authAxios } from "@/features/auth/lib/axios";
import { SignupResponse, SignupSchema } from "@/features/auth/types";

async function signUp(inputs: SignupSchema) {
  try {
    const response = await authAxios.post<SignupResponse>("/signup", {
      ...inputs,
    });

    const { data } = response;
    const { message } = data;

    return { message };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { data } = response;
        const { message } = data;

        throw new Error(message);
      }
    }

    throw new Error("Something went wrong upon signing up");
  }
}

export { signUp };
