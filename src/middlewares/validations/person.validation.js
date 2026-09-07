import { body, param } from "express-validator";

export const createPersonValidation = [
  body("name")
    .notEmpty()
    .withMessage("El name no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El name no debe pasar los 100 carácteres."),

  body("lastname")
    .notEmpty()
    .withMessage("El lastname no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El lastname no debe pasar los 100 carácteres."),
];

export const getPersonByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID de la persona no debe ser nulo.")
    .isInt(),
];

export const updatePersonValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID de la persona no debe ser nulo.")
    .isInt(),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("El name no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El name no debe pasar los 100 carácteres."),

  body("lastname")
    .optional()
    .notEmpty()
    .withMessage("El lastname no debe ser vacío.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El lastname no debe pasar los 100 carácteres."),
  param("id")
    .notEmpty()
    .withMessage("El ID de la persona no puede ser nulo.")
    .isInt(),
];

export const deletePersonValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID de la persona no debe ser nulo.")
    .isInt(),
];
