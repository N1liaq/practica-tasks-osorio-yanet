import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";
import {
  createTaskValidation,
  deleteTaskValidation,
  getTaskByIdValidation,
  updateTaskValidation,
} from "../middlewares/validations/task.validation.js";
import { validate } from "../middlewares/validate.js";

export const taskRouter = Router();

taskRouter.post("/tasks", createTaskValidation, validate, createTask);
taskRouter.get("/tasks", validate, getAllTasks);
taskRouter.get("/tasks/:id", getTaskByIdValidation, validate, getTaskById);
taskRouter.put("/tasks/:id", updateTaskValidation, validate, updateTask);
taskRouter.delete("/tasks/:id", deleteTaskValidation, validate, deleteTask);
