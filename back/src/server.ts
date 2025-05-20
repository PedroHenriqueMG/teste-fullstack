import express from "express";
import { authRouter } from "./auth/authRouter";
import { errosMiddleware } from "./common/middleware/error";
import { db } from "./db/db";
import { env } from "./env";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

db.$connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error: Error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

app.use(errosMiddleware);

app.listen(env.PORT, () => {
  console.log(`App listening on port ${env.PORT}`);
});
