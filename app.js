import express from "express";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { personRouter } from "./src/routes/person.routes.js";
import { config } from "dotenv";
import { roleRouter } from "./src/routes/role.routes.js";

config();

const app = express();
const portBD = process.env.PORTBD;

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", taskRouter);
app.use("/api", personRouter);
app.use("/api", roleRouter);

app.listen(portBD, async () => {
  await startDB();
  console.log(`Servidor encendido`);
});
