import { Router } from "express";
import { insightsController } from "./insightsController";
import { authMiddleware } from "../common/middleware/auth-middleware";

export const insightsRouter = Router();

insightsRouter.use(authMiddleware);
insightsRouter.post("/", insightsController.createInsight);
insightsRouter.get("/", insightsController.getAllInsights);
insightsRouter.get("/:id", insightsController.getOneInsight);
insightsRouter.patch("/:id", insightsController.updateInsight);
insightsRouter.delete("/:id", insightsController.deleteInsight);
