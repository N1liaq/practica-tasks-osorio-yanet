import { Router } from "express";
import {
  createUserRol,
  deleteUserRol,
  getAllUserRol,
  getUserRolById,
  updateUserRol,
} from "../controllers/user_role.controller.js";

export const userRoleRouter = Router();

userRoleRouter.post("/roles/users", createUserRol);
userRoleRouter.get("/roles/users", getAllUserRol);
userRoleRouter.get("/roles/users", getUserRolById);
userRoleRouter.put("/roles/users", updateUserRol);
userRoleRouter.delete("/roles/users", deleteUserRol);
