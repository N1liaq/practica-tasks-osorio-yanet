import { Router } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/role.controller.js";
import {
  createRoleValidation,
  deleteRoleValidation,
  getRoleByIdValidation,
  updateRoleValidation,
} from "../middlewares/validations/role.validation.js";
import { validate } from "../middlewares/validate.js";

export const roleRouter = Router();

roleRouter.post("/roles", createRoleValidation, validate, createRole);
roleRouter.get("/roles", validate, getAllRoles);
roleRouter.get("/roles/:id", getRoleByIdValidation, validate, getRoleById);
roleRouter.put("/roles/:id", updateRoleValidation, validate, updateRole);
roleRouter.delete("/roles/:id", deleteRoleValidation, validate, deleteRole);
