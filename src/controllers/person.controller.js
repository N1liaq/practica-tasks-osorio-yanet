import { matchedData } from "express-validator";
import { PersonModel } from "../models/person.model.js";

export const CreatePerson = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    await PersonModel.create(validatedData);
    return res.status(201).json(validatedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllPerson = async (req, res) => {
  try {
    const people = await PersonModel.findAll();

    return res.status(200).json(people);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getPersonById = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const personId = await PersonModel.findByPk(id);

    if (!personId) {
      return res.status(400).json({
        message: "¡La persona que está buscando no fue encontrado!",
      });
    }
    return res.status(200).json(personId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updatePerson = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const personUpdateExists = await PersonModel.findByPk(id);

    if (!personUpdateExists) {
      return res.status(400).json({
        message:
          "¡El ID de la persona que esta buscando para actualizar no fue encontrado!",
      });
    }
    await personUpdateExists.update(validatedData);
    await personUpdateExists.reload();
    return res.status(201).json(personUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const personDeleteExists = await PersonModel.findByPk(id);

    if (!personDeleteExists) {
      return res.status(400).json({
        message:
          "¡El ID de la persona que está buscando para eliminar no fue encontrado!",
      });
    }
    await personDeleteExists.destroy();
    return res
      .status(200)
      .json({ message: "La persona fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
