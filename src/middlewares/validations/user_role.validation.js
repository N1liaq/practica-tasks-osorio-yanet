import { body, param } from "express-validator";
import { RoleModel } from "../../models/role.model.js";
import { UserModel } from "../../models/user.model.js";
import { UserRoleModel } from "../../models/user_role.model.js";

export const createUserRolValidation = [
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

  body("role_id")
    .notEmpty()
    .withMessage("El role_id no debe ser vacío.")
    .custom((value) => typeof value === "number")
    .withMessage("El role_id debe ser de tipo number.")
    .isInt()

    .custom(async (role_id) => {
      const roleExists = await RoleModel.findByPk(role_id);
      if (!roleExists) {
        throw new Error("El role_id ingresado no fue encontrado.");
      }

      return true;
    }),
];

export const getUserRolByIdValidation = [
  param("id").notEmpty().withMessage("El ID del rol no debe ser nulo."),
];

export const updateUserRolValidation = [
  param("id").notEmpty().withMessage("El ID del rol no debe ser nulo."),

  body("user_id")
    .optional()
    .isEmpty()
    .withMessage("El user_id debe ser estar vacío."),

  body("role_id")
    .notEmpty()
    .withMessage("El role_id no debe ser vacío.")
    .custom((value) => typeof value === "number")
    .withMessage("El role_id debe ser de tipo number.")
    .isInt(),
];

export const deleteUserRolValidation = [
  param("id").notEmpty().withMessage("El ID del rol no debe ser nulo."),
];
