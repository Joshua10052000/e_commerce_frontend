import { AxiosError } from "axios";
import { usersAxios } from "../lib/axios";
import { User } from "@/features/auth/types";

interface Response {
  user: User | null;
}

async function getUser(userId: string) {
  try {
    const response = await usersAxios.get<Response>(`/${userId}`);
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

    throw new Error("Something went wrong upong getting user");
  }
}

export { getUser };
