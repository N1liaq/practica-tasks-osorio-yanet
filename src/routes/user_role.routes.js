import { Router } from "express";
import {
  createUserRol,
  deleteUserRol,
  getAllUserRol,
  getUserRolById,
  updateUserRol,
} from "../controllers/user_role.controller.js";
import {
  createUserRolValidation,
  deleteUserRolValidation,
  updateUserRolValidation,
} from "../middlewares/validations/user_role.validation.js";
import { validate } from "../middlewares/validate.js";
import { getUserByIdValidation } from "../middlewares/validations/user.validation.js";

export const userRoleRouter = Router();

userRoleRouter.post(
  "/rolesUsers",
  createUserRolValidation,
  validate,
  createUserRol,
);
userRoleRouter.get("/rolesUsers", validate, getAllUserRol);
userRoleRouter.get(
  "/rolesUsers/:id",
  getUserByIdValidation,
  validate,
  getUserRolById,
);
userRoleRouter.put(
  "/rolesUsers/:id",
  updateUserRolValidation,
  validate,
  updateUserRol,
);
userRoleRouter.delete(
  "/rolesUsers/:id",
  deleteUserRolValidation,
  validate,
  deleteUserRol,
);
