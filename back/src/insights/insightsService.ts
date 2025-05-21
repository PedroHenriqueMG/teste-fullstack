import { CreateInsightDto } from "../common/dto/insightsDto";
import { Insight } from "../common/entities/insight";
import { NotFoundError } from "../common/helpers/api-erros";
import { insightRepository } from "../common/repository/insightRepository";
import { userRepository } from "../common/repository/userRepository";

interface InsightProps extends CreateInsightDto {
  userId: string;
}

class InsightsService {
  async create(insight: InsightProps) {
    const newInsight = new Insight(insight);

    const createdInsight = await insightRepository.upsert(newInsight);

    return createdInsight;
  }

  async getAllUserData(userId: string) {
    const existUser = await userRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundError("Usuario não encontrado");
    }

    return insightRepository.getAllByUserId(userId);
  }
}

export const insightsService = new InsightsService();
