import { CreateInsightDto, UpdateInsightDto } from "../common/dto/insightsDto";
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

  async getOneUserData(id: string) {
    const insight = await insightRepository.getById(id);

    if (!insight) {
      throw new NotFoundError("Insight não encontrado");
    }

    return insight;
  }

  async update(id: string, insight: UpdateInsightDto) {
    const existInsight = await insightRepository.getById(id);

    if (!existInsight) {
      throw new NotFoundError("Insight não encontrado");
    }

    const updateInsight = {
      title: insight.title ?? existInsight.title,
      description: insight.description ?? existInsight.content,
      tags: insight.tags ?? existInsight.tags.map((tag) => tag.name),
      userId: existInsight.userId,
    };

    const updatedInsight = new Insight(updateInsight, id);
    return insightRepository.upsert(updatedInsight);
  }

  async delete(id: string) {
    const deletedInsight = await insightRepository.deleteById(id);

    if (!deletedInsight) {
      throw new NotFoundError("Insight não encontrado");
    }

    return;
  }
}

export const insightsService = new InsightsService();
