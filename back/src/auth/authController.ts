import { Request, Response } from "express";
import { AuthUserDto, CreateUserDto } from "../common/dto/userDto";
import { userService } from "./authService";

class AuthController {
  async signUp(req: Request, res: Response) {
    const body = CreateUserDto.parse(req.body);
    const userResponse = await userService.execute(body);
    res.status(201).json(userResponse);
  }

  async signIn(req: Request, res: Response) {
    const body = AuthUserDto.parse(req.body);
    const token = await userService.authorize(body);
    res.json({
      token: token,
    });
  }

  async getUser(req: Request, res: Response) {
    const { userId } = req;
    const userData = await userService.getUserData(userId);

    const { password: _, ...loggedUser } = userData;
    res.json(loggedUser);
  }
}

export const authController = new AuthController();
