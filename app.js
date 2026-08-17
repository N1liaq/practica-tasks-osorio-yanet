import express from "express";
import { startDB } from "./src/config/database.js";

const app = express();
const PORT = 3000;

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
