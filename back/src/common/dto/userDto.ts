import { z } from "zod";

export const CreateUserDto = z.object({
  name: z.string().min(1, "O nome obrigatorio"),
  email: z.string().email(),
  password: z.string().min(1, "A senha obrigatoria"),
});

export const AuthUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(1, "O nome obrigatorio"),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
export type AuthUserDto = z.infer<typeof AuthUserDto>;
