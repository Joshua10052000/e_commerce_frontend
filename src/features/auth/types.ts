import { signinSchema, signupSchema } from "@/features/auth/lib/zod";

type SignupSchema = Zod.infer<typeof signupSchema>;
type SigninSchema = Zod.infer<typeof signinSchema>;

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SignupResponse {
  message: string;
}

interface SigninResponse {
  message: string;
  user: User;
}

interface SessionResponse {
  user?: User;
}

export type {
  SignupSchema,
  SigninSchema,
  SignupResponse,
  SigninResponse,
  SessionResponse,
  User,
};
