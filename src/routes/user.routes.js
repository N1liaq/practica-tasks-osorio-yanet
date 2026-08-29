import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserTasks,
  updateUser,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/tasks/users/:id", getUserTasks);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);
