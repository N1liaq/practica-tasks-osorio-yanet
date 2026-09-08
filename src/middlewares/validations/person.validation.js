import { body, param } from "express-validator";

export const createPersonValidation = [
  body("name")
    .notEmpty()
    .withMessage("El name no debe ser vacío.")
    .isAlpha()
    .withMessage("El name debe contener solo letras.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El name no debe pasar los 100 carácteres."),

  body("lastname")
    .notEmpty()
    .withMessage("El lastname no debe ser vacío.")
    .isAlpha()
    .withMessage("El lastname debe contener solo letras.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El lastname no debe pasar los 100 carácteres."),
];

export const getPersonByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID de la persona no debe ser nulo.")
    .isLength({ max: 3 }),
];

export const updatePersonValidation = [
  param("id").notEmpty().withMessage("El ID de la persona no debe ser nulo."),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("El name no debe ser vacío.")
    .isAlpha()
    .withMessage("El name debe contener solo letras.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El name no debe pasar los 100 carácteres."),

  body("lastname")
    .optional()
    .notEmpty()
    .withMessage("El lastname no debe ser vacío.")
    .isAlpha()
    .withMessage("El lastname debe contener solo letras.")
    .isString()
    .isLength({ max: 100 })
    .withMessage("El lastname no debe pasar los 100 carácteres."),
  param("id").notEmpty().withMessage("El ID de la persona no puede ser nulo."),
];

export const deletePersonValidation = [
  param("id").notEmpty().withMessage("El ID de la persona no debe ser nulo."),
];
