import { z } from "zod";

const signupSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

const signinSchema = z.object({ email: z.string(), password: z.string() });

export { signupSchema, signinSchema };
