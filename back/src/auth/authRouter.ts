import { Router } from "express";
import { authController } from "./authController";
import { authMiddleware } from "../common/middleware/auth-middleware";

export const authRouter = Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.get("/me", authMiddleware, authController.getUser);
