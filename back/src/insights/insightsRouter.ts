import { Router } from "express";
import { insightsController } from "./insightsController";
import { authMiddleware } from "../common/middleware/auth-middleware";

export const insightsRouter = Router();

insightsRouter.use(authMiddleware);
insightsRouter.post("/", insightsController.createInsight);
insightsRouter.get("/", insightsController.getAllInsights);
