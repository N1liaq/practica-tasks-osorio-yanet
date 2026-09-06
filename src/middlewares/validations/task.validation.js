import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("El title no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El title no debe pasar los 100 carácteres.")

    .custom(async (title) => {
      const titleExists = await TaskModel.findOne({ where: { title } });
      if (titleExists) {
        throw new Error("El title ingresado ya está en uso.");
      }
      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("El description no debe ser vacío.")
    .isLength({ max: 100 })
    .withMessage("El description no debe pasar los 100 carácteres."),

  body("isComplete")
    .notEmpty()
    .withMessage("El isComplete no debe ser vacío.")
    .custom((value) => typeof value === "boolean")
    .isBoolean()
    .withMessage(
      "El isComplete debe ser de tipo boolean. Ingrese true o false.",
    ),

  body("user_id")
    .notEmpty()
    .withMessage("El user_id no debe ser vacío.")
    .custom((value) => typeof value === "number")
    .withMessage("El user_id debe ser de tipo number.")
    .isInt()

    .custom(async (user_id) => {
      const userExists = await UserModel.findByPk(user_id);
      if (!userExists) {
        throw new Error("El user_id ingresado no fue encontrado.");
      }
      return true;
    }),
];

export const getTaskByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID de la tarea no puede ser nulo.")
    .isInt(),
];

export const updateTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del tarea no puede ser nulo.")
    .isInt(),

  body("title")
    .optional()
    .notEmpty()
    .withMessage("El title no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El title no debe pasar los 100 carácteres.")

    .custom(async (title) => {
      const titleExists = await TaskModel.findOne({ where: { title } });
      if (titleExists) {
        throw new Error("El title ingresado ya está en uso.");
      }
      return true;
    }),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("El description no debe ser vacío.")
    .isLength({ max: 100 })
    .withMessage("El description no debe pasar los 100 carácteres."),

  body("isComplete")
    .optional()
    .notEmpty()
    .withMessage("El isComplete no debe ser vacío.")
    .isBoolean()
    .custom((value) => typeof value === "boolean")
    .withMessage(
      "El isComplete debe ser de tipo boolean. Ingrese true o false.",
    ),

  body("user_id")
    .optional()
    .isEmpty()
    .withMessage("El user_id debe ser estar vacío."),
];

export const deleteTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del usuario no puede ser nulo.")
    .isInt(),
];
