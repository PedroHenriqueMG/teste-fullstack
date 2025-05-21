import { z } from "zod";

export const CreateInsightDto = z.object({
  title: z.string().min(1, "O titulo obrigatorio"),
  description: z.string().min(1, "A descricao obrigatoria"),
  tags: z.array(z.string()).min(1, "As tags obrigatorias"),
});

export type CreateInsightDto = z.infer<typeof CreateInsightDto>;
