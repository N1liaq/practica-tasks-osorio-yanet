import { PersonModel } from "../models/person.model.js";

export const CreatePerson = async (req, res) => {
  try {
    const { name, lastname } = req.body;
    if (!name) {
      return res.status(400).json({ message: "El nombre no puede ser nulo." });
    }
    if (name.length > 100) {
      return res
        .status(400)
        .json({ message: "El nombre no debe pasar los 100 carácteres." });
    }
    if (!lastname) {
      return res
        .status(400)
        .json({ message: "El apellido no puede ser nulo." });
    }
    if (lastname.length > 100) {
      return res
        .status(400)
        .json({ message: "El apellido no debe pasar los 100 carácteres." });
    }
    const newPeople = await PersonModel.create({ name, lastname });
    return res.status(201).json(newPeople);
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
    const { id } = req.params;
    const personId = await PersonModel.findByPk(id);

    if (!personId) {
      return res.status(400).json({
        message: "La persona a la que busca no existe o no fue encontrada.",
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
    const { id } = req.params;
    const { name, lastname } = req.body;
    const personUpdate = await PersonModel.findByPk(id);
    if (!name) {
      return res.status(400).json({ message: "El nombre no puede ser nulo." });
    }
    if (name.length > 100) {
      return res
        .status(400)
        .json({ message: "El nombre no debe pasar los 100 carácteres." });
    }
    if (!lastname) {
      return res
        .status(400)
        .json({ message: "El apellido no puede ser nulo." });
    }
    if (lastname.length > 100) {
      return res
        .status(400)
        .json({ message: "El apellido no debe pasar los 100 carácteres." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
  await personUpdate.update({ name, lastname });
  return res.status(200).json(personUpdate);
};
export const deletePerson = async (req, res) => {
  try {
    const personDelete = await PersonModel.findByPk(id);
    if (!personDelete) {
      return res.status(404).json({
        message:
          "No se encontró la persona que se está buscando para eliminar.",
      });
    }
    await personDelete.destroy();
    return res
      .status(200)
      .json({ message: "La persona fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
