import express from "express";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", userRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
