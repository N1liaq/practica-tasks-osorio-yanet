import { body, param } from "express-validator";
import { PersonModel } from "../../models/person.model.js";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("nameUser")
    .notEmpty()
    .withMessage("El nameUser no debe ser vacío.")

    .isString()

    .isLength({ max: 100 })
    .withMessage("El nameUser no debe pasar los 100 carácteres.")

    .custom(async (nameUser) => {
      const nameUserExists = await UserModel.findOne({ where: { nameUser } });
      if (nameUserExists) {
        throw new Error("El nameUser ingresado ya está en uso.");
      }
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("El email no debe ser vacío.")
    .normalizeEmail()

    .custom(async (email) => {
      const emailExists = await UserModel.findOne({ where: { email } });
      if (emailExists) {
        throw new Error("El email ingresado ya está en uso.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .isString()
    .withMessage("La password no debe ser vacía.")

    .isLength({ max: 100 })
    .withMessage("La password no debe pasar los 100 carácteres."),

  body("person_id")
    .notEmpty()
    .custom((value) => typeof value === "number")
    .withMessage("El person_id debe ser de tipo number.")
    .isInt()
    .withMessage("El person_id debe ser númmerico.")
    .withMessage("El person_id no debe ser vacío.")

    .custom(async (person_id) => {
      const personExists = await PersonModel.findByPk(person_id);
      if (!personExists) {
        throw new Error("El person_id ingresado no fue encontrado.");
      }
      const personIdExists = await UserModel.findOne({ where: { person_id } });
      if (personIdExists) {
        throw new Error("El person_id ingresado ya está en uso.");
      }
      return true;
    }),
];

export const getUserTasksValidation = [
  param("id")
    .notEmpty()
    .isInt()
    .withMessage("El ID debe ser númmerico.")
    .toInt(),
];

export const getUserByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del userName no puede ser nulo.")
    .isInt()
    .withMessage("El ID debe ser númmerico."),
];

export const updateUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del nameUser no puede ser nulo.")
    .isInt()
    .withMessage("El ID debe ser númmerico.")
    .toInt(),

  body("nameUser")
    .optional()
    .notEmpty()
    .withMessage("El nameUser no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El nameUser no debe pasar los 100 carácteres.")

    .custom(async (nameUser) => {
      const nameUserExists = await UserModel.findOne({ where: { nameUser } });
      if (nameUserExists) {
        throw new Error("El nameUser ingresado ya está en uso.");
      }
      return true;
    }),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("El email no debe ser vacío.")
    .normalizeEmail()

    .custom(async (email) => {
      const emailExists = await UserModel.findOne({ where: { email } });
      if (emailExists) {
        throw new Error("El email ingresado ya está en uso.");
      }
      return true;
    }),

  body("password")
    .optional()
    .notEmpty()
    .withMessage("La password no debe ser vacía.")
    .isLength({ max: 100 })
    .withMessage("La password no debe pasar los 100 carácteres."),

  body("person_id")
    .optional()
    .isEmpty()
    .withMessage("El person_id debe ser estar vacío."),
];

export const deleteUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del nameUser no puede ser nulo.")
    .isInt()
    .withMessage("El ID debe ser númmerico."),
];
