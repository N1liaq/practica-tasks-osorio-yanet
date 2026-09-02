import { Router } from "express";
import {
  createUserRol,
  deleteUserRol,
  getAllUserRol,
  getUserRolById,
  updateUserRol,
} from "../controllers/user_role.controller.js";

export const userRoleRouter = Router();

userRoleRouter.post("/rolesUsers", createUserRol);
userRoleRouter.get("/rolesUsers", getAllUserRol);
userRoleRouter.get("/rolesUsers/:id", getUserRolById);
userRoleRouter.put("/rolesUsers/:id", updateUserRol);
userRoleRouter.delete("/rolesUsers/:id", deleteUserRol);
