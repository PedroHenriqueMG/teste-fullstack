import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "O nome obrigatorio"),
});

export const signUpSchema = z.object({
  name: z.string().min(1, "O nome obrigatorio"),
  email: z.string().email(),
  password: z.string().min(1, "A senha obrigatoria"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
