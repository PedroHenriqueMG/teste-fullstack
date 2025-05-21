import { z } from "zod";

export const CreateInsightDto = z.object({
  title: z.string().min(1, "O titulo obrigatorio"),
  description: z.string().min(1, "A descricao obrigatoria"),
  tags: z.array(z.string()).min(1, "As tags obrigatorias"),
});

export const GetInsightDto = z.object({
  tag: z.string().optional(),
  page: z.number(),
  limit: z.number(),
});

export const UpdateInsightDto = z.object({
  title: z.string().min(1, "O titulo obrigatorio").optional(),
  description: z.string().min(1, "A descricao obrigatoria").optional(),
  tags: z.array(z.string()).min(1, "As tags obrigatorias").optional(),
});

export type CreateInsightDto = z.infer<typeof CreateInsightDto>;
export type GetInsightDto = z.infer<typeof GetInsightDto>;
export type UpdateInsightDto = z.infer<typeof UpdateInsightDto>;
