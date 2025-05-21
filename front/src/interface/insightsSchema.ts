import { z } from "zod";

export const insightsSchema = z.object({
  insights: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      userId: z.string(),
      tags: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      ),
    })
  ),

  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const createInsightFormSchema = z.object({
  title: z.string().min(1, "O titulo obrigatorio"),
  description: z.string().min(1, "A descricao obrigatoria"),
});

export const createInsightSchema = z.object({
  title: z.string().min(1, "O titulo obrigatorio"),
  description: z.string().min(1, "A descricao obrigatoria"),
  tags: z.array(z.string()).min(1, "As tags obrigatorias"),
});

export type Insights = z.infer<typeof insightsSchema>;

export type CreateInsightFormProps = z.infer<typeof createInsightFormSchema>;
export type CreateInsightProps = z.infer<typeof createInsightSchema>;
