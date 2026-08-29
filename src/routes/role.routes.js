import { Router } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/role.controller.js";

export const roleRouter = Router();

roleRouter.post("/roles", createRole);
roleRouter.get("/roles", getAllRoles);
roleRouter.get("/roles/:id", getRoleById);
roleRouter.put("/roles/:id", updateRole);
roleRouter.delete("/roles/:id", deleteRole);
