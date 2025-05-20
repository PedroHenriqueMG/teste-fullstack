import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string(),
  JWT_PASS: z.string().min(1),
});

export const env = envSchema.parse(process.env);
