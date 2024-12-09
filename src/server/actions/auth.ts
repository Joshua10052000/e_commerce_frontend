import { SigninSchema } from "@/components/auth/signin-form";
import axiosStatic, { AxiosError } from "axios";
import { SERVER_URL } from "../constants";
import { SignupSchema } from "@/components/auth/signup-form";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ServerResponse {
  message: string;
}

const axios = axiosStatic.create({ withCredentials: true });

async function signUp(inputs: SignupSchema) {
  try {
    const response = await axios.post<ServerResponse>(
      `${SERVER_URL}/api/auth/signup`,
      {
        ...inputs,
      },
    );

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

async function signIn(inputs: SigninSchema) {
  try {
    const response = await axios.post<ServerResponse & { user: User }>(
      `${SERVER_URL}/api/auth/signin`,
      {
        ...inputs,
      },
    );

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

async function getSession() {
  try {
    const response = await axios.get<{ session: { user?: User } }>(
      `${SERVER_URL}/api/auth/session`,
    );

    const { data } = response;
    const { session } = data;

    return { user: session.user };
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

export type { User };
export default { signIn, signUp, getSession };
