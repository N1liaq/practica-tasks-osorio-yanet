import { matchedData } from "express-validator";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    await TaskModel.create(validatedData);
    return res.status(201).json(validatedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password", "user_id"],
          },
        },
      ],
      include: [
        {
          model: UserModel,
          as: "author",
        },
      ],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const taskIdExists = await TaskModel.findByPk(id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password", "user_id"],
          },
        },
      ],
      include: [
        {
          model: UserModel,
          as: "author",
        },
      ],
    });

    if (!taskIdExists) {
      return res.status(404).json({ message: "La tarea no fue encontrada." });
    }

    return res.status(200).json(taskIdExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateTask = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const taskUpdateExists = await TaskModel.findByPk(id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password", "user_id"],
          },
        },
      ],
      include: [
        {
          model: UserModel,
          as: "author",
        },
      ],
    });

    if (!taskUpdateExists) {
      return res.status(404).json({
        message:
          "¡El ID de la tarea que esta buscando para actualizar no fue encontrado!",
      });
    }

    await taskUpdateExists.update(validatedData);

    await taskUpdateExists.reload();

    return res.status(200).json(taskUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const taskDeleteExists = await TaskModel.findByPk(id);

    if (!taskDeleteExists) {
      return res.status(404).json({
        message:
          "¡El ID de la tarea que esta buscando para eliminar no fue encontrado!",
      });
    }

    await taskDeleteExists.destroy();
    res.status(200).json({ message: "La tarea fue eliminada correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
