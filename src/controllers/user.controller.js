import { UserModel } from "../models/user.model.js";
import { PersonModel } from "../models/person.model.js";
import { TaskModel } from "../models/task.model.js";
import { matchedData } from "express-validator";
export const createUser = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    await UserModel.create(validatedData);
    return res.status(201).json(validatedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: {
        exclude: ["password", "person_id"],
      },
      include: [
        {
          model: PersonModel,
          as: "owner",
        },
      ],
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const userWithTasks = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          as: "tareas",
        },
      ],
    });
    if (!userWithTasks) {
      return res
        .status(404)
        .json("¡El usuario que está buscando no fue encontrado!");
    }
    return res.status(200).json(userWithTasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const UserIdExists = await UserModel.findByPk(id, {
      attributes: {
        exclude: ["password", "person_id"],
      },
      include: [
        {
          model: PersonModel,
          as: "owner",
        },
      ],
    });

    if (!UserIdExists) {
      return res
        .status(404)
        .json("¡El usuario que esta buscando no fué encontrado!");
    }

    return res.status(200).json(UserIdExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id, dataToUpdate } = validatedData;

    const userUpdateExists = await UserModel.findByPk(id, {
      attributes: {
        exclude: ["password", "person_id"],
      },
      include: [
        {
          model: PersonModel,
          as: "owner",
        },
      ],
    });

    if (!userUpdateExists) {
      return res.status(404).json({
        message:
          "¡El ID del usuario que esta buscando para actualizar no fue encontrado!",
      });
    }
    await userUpdateExists.update(validatedData);
    await userUpdateExists.reload();
    return res.status(201).json(userUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const userDeleteExists = await UserModel.findByPk(id);

    if (!userDeleteExists) {
      return res
        .status(404)
        .json(
          "¡El ID del nameUser que esta buscando para eliminar no fué encontrado!",
        );
    }
    await userDeleteExists.destroy();
    res
      .status(200)
      .json({ message: "El usuario fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
