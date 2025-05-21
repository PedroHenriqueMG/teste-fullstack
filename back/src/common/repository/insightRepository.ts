import { PrismaClient } from "@prisma/client";
import { Insight } from "../entities/insight";
import { randomUUID } from "crypto";

class InsightRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async upsert(insight: Insight) {
    const { id, title, description, tags, userId } = insight;

    const tagOperations = tags.map((tagName) => ({
      where: { name: tagName },
      create: { name: tagName, id: randomUUID() },
    }));

    return this.db.insights.upsert({
      where: { id },
      create: {
        id,
        title,
        content: description,
        user: {
          connect: { id: userId },
        },
        tags: {
          connectOrCreate: tagOperations,
        },
      },
      update: {
        title,
        content: description,
        tags: {
          set: [],
          connectOrCreate: tagOperations,
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async getAllByUserId(
    userId: string,
    options: { tag?: string; limit: number; offset: number }
  ) {
    const { tag, limit, offset } = options;

    const whereClause = {
      user: {
        id: userId,
      },
      ...(tag && {
        tags: {
          some: {
            name: tag,
          },
        },
      }),
    };

    const [data, total] = await this.db.$transaction([
      this.db.insights.findMany({
        where: whereClause,
        include: {
          tags: true,
        },
        skip: offset,
        take: limit,
      }),
      this.db.insights.count({
        where: whereClause,
      }),
    ]);

    return {
      insights: data,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
    };
  }

  async getById(id: string) {
    return this.db.insights.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
  }

  async deleteById(id: string) {
    return this.db.insights.delete({
      where: {
        id,
      },
    });
  }
}

export const insightRepository = new InsightRepository(new PrismaClient());
