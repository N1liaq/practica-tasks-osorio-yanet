import { Router } from "express";
import {
  CreatePerson,
  deletePerson,
  getAllDeletePerson,
  getAllPerson,
  getPersonById,
  updatePerson,
} from "../controllers/person.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createPersonValidation,
  deletePersonValidation,
  getPersonByIdValidation,
  updatePersonValidation,
} from "../middlewares/validations/person.validation.js";

export const personRouter = Router();

personRouter.post("/people", createPersonValidation, validate, CreatePerson);
personRouter.get("/people", validate, getAllPerson);
personRouter.get("/peoplent", validate, getAllDeletePerson);
personRouter.get(
  "/people/:id",
  getPersonByIdValidation,
  validate,
  getPersonById,
);
personRouter.put("/people/:id", updatePersonValidation, validate, updatePerson);
personRouter.delete(
  "/people/:id",
  deletePersonValidation,
  validate,
  deletePerson,
);
