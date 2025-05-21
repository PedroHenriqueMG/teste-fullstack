import express from "express";
import cors from "cors";
import { authRouter } from "./auth/authRouter";
import { errosMiddleware } from "./common/middleware/error";
import { env } from "./env";
import { PrismaClient } from "@prisma/client";
import { insightsRouter } from "./insights/insightsRouter";

const db = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/insights", insightsRouter);

db.$connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error: Error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

app.use(errosMiddleware);

app.listen(env.PORT, () => {
  console.log(`App rodando na porta: ${env.PORT}`);
});
