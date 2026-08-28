import { Router } from "express";
import {
  CreatePerson,
  deletePerson,
  getAllPerson,
  getPersonById,
  updatePerson,
} from "../controllers/person.controller.js";

export const personRouter = Router();

personRouter.post("/people", CreatePerson);
personRouter.get("/people", getAllPerson);
personRouter.get("/people/:id", getPersonById);
personRouter.put("/people/:id", updatePerson);
personRouter.delete("/people/:id", deletePerson);
