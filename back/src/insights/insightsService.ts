import { CreateInsightDto } from "../common/dto/insightsDto";
import { Insight } from "../common/entities/insight";
import { insightRepository } from "../common/repository/insightRepository";

interface InsightProps extends CreateInsightDto {
  userId: string;
}

class InsightsService {
  async create(insight: InsightProps) {
    const newInsight = new Insight(insight);

    const createdInsight = await insightRepository.upsert(newInsight);

    return createdInsight;
  }
}

export const insightsService = new InsightsService();
