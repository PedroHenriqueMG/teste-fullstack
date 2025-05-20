import { PrismaClient } from "@prisma/client";
import { User } from "../entities/user";

class UserRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create(user: User) {
    return this.db.users.create({ data: user });
  }

  async findByEmail(email: string) {
    return this.db.users.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string) {
    return this.db.users.findUnique({
      where: {
        id: id,
      },
    });
  }
}

export const userRepository = new UserRepository(new PrismaClient());
