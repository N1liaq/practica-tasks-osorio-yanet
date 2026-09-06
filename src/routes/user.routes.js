import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserTasks,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserValidation,
  deleteUserValidation,
  getUserByIdValidation,
  getUserTasksValidation,
  updateUserValidation,
} from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.post("/users", createUserValidation, validate, createUser);
userRouter.get("/users", validate, getAllUsers);
userRouter.get(
  "/tasks/users/:id",
  getUserTasksValidation,
  validate,
  getUserTasks,
);
userRouter.get("/users/:id", getUserByIdValidation, validate, getUserById);
userRouter.put("/users/:id", updateUserValidation, validate, updateUser);
userRouter.delete("/users/:id", deleteUserValidation, validate, deleteUser);
