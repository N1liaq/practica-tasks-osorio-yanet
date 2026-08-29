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

    // if (!people) {
    //   return res
    //     .status(404)
    //     .json({ message: "No hay personas ingresadas actualmente." });
    // }

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

    if (!id) {
      return res
        .status(400)
        .json({ message: "el ID de la persona no puede ser nulo." });
    }
    if (!personId) {
      return res.status(404).json({
        message: "¡El ID del usuario que esta buscando no fue encontrado!",
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

    const personUpdateExists = await PersonModel.findByPk(id);

    if (!id) {
      return res
        .status(400)
        .json({ message: "el ID de la persona no puede ser nulo." });
    }

    if (!personUpdateExists) {
      return res.status(404).json({
        message:
          "¡El ID del usuario que esta buscando para actualizar no fue encontrado!",
      });
    }

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
    await personUpdateExists.update({ name, lastname });
    return res.status(200).json(personUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;

    const personDeleteExists = await PersonModel.findByPk(id);

    if (!id) {
      return res
        .status(400)
        .json({ message: "el ID de la persona no puede ser nulo." });
    }

    if (!personDeleteExists) {
      return res.status(404).json({
        message:
          "¡El ID del usuario que esta buscando para eliminar no fue encontrado!",
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
