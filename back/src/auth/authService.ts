import bcrypt from "bcrypt";
import { AuthUserDto, CreateUserDto } from "../common/dto/userDto";
import { User } from "../common/entities/user";
import {
  BadRequestError,
  UnauthorizedError,
} from "../common/helpers/api-erros";
import { userRepository } from "../common/repository/userRepository";
import jwt, { JwtPayload } from "jsonwebtoken";

class UserService {
  async execute(user: CreateUserDto) {
    const emailExist = await userRepository.findByEmail(user.email);

    if (emailExist) {
      throw new BadRequestError("Email ja cadastrado");
    }

    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      name: user.name,
      email: user.email,
      password: hashPassword,
    });

    const userData = await userRepository.create(newUser);

    const { password: _, ...userResponse } = userData;

    return userResponse;
  }

  async authorize(user: AuthUserDto) {
    const userData = await userRepository.findByEmail(user.email);

    if (!userData) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const verifyPass = await bcrypt.compare(user.password, userData.password);

    if (!verifyPass) {
      throw new BadRequestError("Email ou senha inválidos");
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_PASS ?? " ", {
      expiresIn: "8h",
    });

    return token;
  }

  async getUserData(id: string) {
    const userData = await userRepository.findById(id);

    if (!userData) {
      throw new UnauthorizedError("Faça login para ter acesso a essa rota");
    }
    const { password: _, ...loggedUser } = userData;
    return loggedUser;
  }
}

export const userService = new UserService();
