import { Request, Response } from "express";
import { CreateInsightDto } from "../common/dto/insightsDto";
import { insightsService } from "./insightsService";

class InsightsController {
  async createInsight(req: Request, res: Response) {
    const { userId } = req;
    const body = CreateInsightDto.parse(req.body);
    const insight = await insightsService.create({
      description: body.description,
      title: body.title,
      userId,
      tags: body.tags,
    });

    res.status(201).json(insight);
  }
}

export const insightsController = new InsightsController();
