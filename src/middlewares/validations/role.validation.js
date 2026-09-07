import { body, param } from "express-validator";
import { RoleModel } from "../../models/role.model.js";

export const createRoleValidation = [
  body("roleName")
    .isAlpha()
    .withMessage("El roleName debe contener solo letras.")
    .notEmpty()
    .withMessage("El roleName no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El roleName no debe pasar los 100 carácteres.")
    .custom(async (roleName) => {
      const roleNameExists = await RoleModel.findOne({ where: { roleName } });
      if (roleNameExists) {
        throw new Error("El roleName ingresado ya está en uso.");
      }
      return true;
    }),
];

export const getRoleByIdValidation = [
  param("id").notEmpty().withMessage("El ID del rol no debe ser nulo.").isInt(),
];

export const updateRoleValidation = [
  param("id").notEmpty().withMessage("El ID del rol no debe ser nulo.").isInt(),

  body("roleName")
    .notEmpty()
    .withMessage("El roleName no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El roleName no debe pasar los 100 carácteres.")
    .custom(async (roleName) => {
      const roleNameExists = await RoleModel.findOne({ where: { roleName } });
      if (roleNameExists) {
        throw new Error("El roleName ingresado ya está en uso.");
      }
      return true;
    }),
];

export const deleteRoleValidation = [
  param("id").notEmpty().withMessage("El ID del rol no debe ser nulo.").isInt(),
];
