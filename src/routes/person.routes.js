import { Router } from "express";
import { userRouter } from "./user.routes";
import {
  CreatePerson,
  deletePerson,
  getAllPerson,
  getPersonById,
  updatePerson,
} from "../controllers/person.controller.js";

export const personRouter = Router();

userRouter.post("/people", CreatePerson);
userRouter.get("/people", getAllPerson);
userRouter.get("/people/:id", getPersonById);
userRouter.put("/people/:id", updatePerson);
userRouter.delete("/people/:id", deletePerson);
