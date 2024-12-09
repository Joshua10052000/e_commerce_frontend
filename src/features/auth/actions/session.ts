import { AxiosError } from "axios";

import { authAxios } from "@/features/auth/lib/axios";
import { SessionResponse } from "@/features/auth/types";

async function getSession() {
  try {
    const response = await authAxios.get<SessionResponse>("/session");

    const { data } = response;
    const { user } = data;

    return { user };
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

export { getSession };
