import { api } from "@/api/api";
import type { CreateInsightProps } from "@/interface/insightsSchema";

interface InsightProps {
  page: number;
  limit: number;
  tag?: string;
}

class InsighsService {
  async create(insight: CreateInsightProps) {
    const response = await api.post("/insights", {
      title: insight.title,
      description: insight.description,
      tags: insight.tags,
    });

    return response.data;
  }
  async getAll(filter: InsightProps) {
    const response = await api.get("/insights", {
      params: {
        page: filter.page,
        limit: filter.limit,
        tag: filter.tag,
      },
    });

    return response.data;
  }

  async getOne(id: string) {
    const response = await api.get(`/insights/${id}`);
    return response.data;
  }

  async update(id: string, data: CreateInsightProps) {
    const response = await api.patch(`/insights/${id}`, {
      title: data.title,
      description: data.description,
      tags: data.tags,
    });
    return response.data;
  }

  async delete(id: string) {
    const response = await api.delete(`/insights/${id}`);
    return response.data;
  }
}

export const insighsService = new InsighsService();
