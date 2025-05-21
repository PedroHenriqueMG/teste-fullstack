import { Request, Response } from "express";
import {
  CreateInsightDto,
  GetInsightDto,
  UpdateInsightDto,
} from "../common/dto/insightsDto";
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

  async getAllInsights(req: Request, res: Response) {
    const filter = GetInsightDto.parse({
      ...req.query,
      page: Number(req.query.page),
      limit: Number(req.query.limit),
    });

    const { userId } = req;
    const result = await insightsService.getAllUserData(userId, filter);

    res.json(result);
  }

  async getOneInsight(req: Request, res: Response) {
    const { id } = req.params;
    const insight = await insightsService.getOneUserData(id);
    res.json(insight);
  }

  async updateInsight(req: Request, res: Response) {
    const { id } = req.params;
    const body = UpdateInsightDto.parse(req.body);
    const insight = await insightsService.update(id, body);
    res.json(insight);
  }

  async deleteInsight(req: Request, res: Response) {
    const { id } = req.params;
    await insightsService.delete(id);
    res.sendStatus(204);
  }
}

export const insightsController = new InsightsController();
