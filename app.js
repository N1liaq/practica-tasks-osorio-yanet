import express from "express";
import { config } from "dotenv";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { personRouter } from "./src/routes/person.routes.js";
import { roleRouter } from "./src/routes/role.routes.js";
import { userRoleRouter } from "./src/routes/user_role.routes.js";

config();

const app = express();
const portBD = process.env.PORTBD;

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", taskRouter);
app.use("/api", personRouter);
app.use("/api", roleRouter);
app.use("/api", userRoleRouter);

app.listen(portBD, async () => {
  await startDB();
  console.log(`Servidor encendido`);
});
