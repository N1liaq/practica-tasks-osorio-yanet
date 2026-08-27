import { PersonModel } from "../models/person.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    let { isComplete } = req.body;
    if (!title) {
      return res.status(400).json({ message: "El título no puede ser nulo." });
    }

    if (title.length > 100) {
      return res
        .status(400)
        .json({ message: "El título no debe pasar los 100 carácteres." });
    }

    const titleExists = await TaskModel.findOne({ where: { title } });

    if (!titleExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("El valor ingresado ya existe.");
      return res.status(400).json({ message: "El título ya está en uso." });
    }
    if (!description) {
      return res
        .status(400)
        .json({ message: "La descripción no debe ser nula." });
    }
    if (description.length > 100) {
      return res
        .status(400)
        .json({ message: "La descripción no debe pasar los 100 carácteres." });
    }
    if (isComplete === undefined || isComplete === null) {
      return res.status(400).json({ message: "El valor no puede ser nulo." });
    }
    if (typeof isComplete === "string") {
      const isCompleteStringnt = isComplete.trim().toLowerCase();
      if (isCompleteStringnt === "true") {
        isComplete = true;
      }
      if (isCompleteStringnt === "false") {
        isComplete = false;
      }
    }
    if (typeof isComplete !== "boolean") {
      return res
        .status(400)
        .json({ message: "Solo se permite valores 'true' o 'false'." });
    }

    if (!user_id) {
      return res
        .status(400)
        .json({ message: "¡El usuario que está buscando no existe!" });
    }
    const newTask = await TaskModel.create({
      title,
      description,
      isComplete,
      user_id,
    });
    return res.status(201).json(newTask);
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
            exclude: ["password", "person_id"],
          },
        },
      ],
      include: [
        {
          model: PersonModel,
          as: "owner",
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
    const { id } = req.params;
    const taskId = await TaskModel.findByPk(id);

    if (!taskId) {
      return res
        .status(400)
        .json({ message: "La tarea no existe o no fue encontrada." });
    }
    return res.status(200).json(taskId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let { isComplete } = req.body;

    const taskUpdate = await TaskModel.findByPk(id);
    if (!taskUpdate) {
      return res.status(404).json({ message: "La tarea no existe." });
    }

    if (!title) {
      return res.status(400).json({ message: "El título no puede ser nulo." });
    }

    if (title.length > 100) {
      return res
        .status(400)
        .json({ message: "El título no debe pasar los 100 carácteres." });
    }

    if (!description) {
      return res
        .status(400)
        .json({ message: "La descripción no puede ser nula." });
    }
    if (description.length > 100) {
      return res
        .status(400)
        .json({ message: "La descripción no debe pasar los 100 carácteres." });
    }

    if (isComplete === undefined || isComplete === null) {
      return res.status(400).json({ message: "El valor no puede ser nulo." });
    }
    if (typeof isComplete === "string") {
      const isCompleteStringnt = isComplete.trim().toLowerCase();
      if (isCompleteStringnt === "true") {
        isComplete = true;
      }
      if (isCompleteStringnt === "false") {
        isComplete = false;
      }
    }
    if (typeof isComplete !== "boolean") {
      return res
        .status(400)
        .json({ message: "Solo se permite valores 'true' o 'false'." });
    }

    await taskUpdate.update({ title, description, isComplete });
    return res.status(200).json(taskUpdate);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskDelete = await TaskModel.findByPk(id);
    if (!taskDelete) {
      return res.status(404).json({
        message: "No se encontró la tarea que se está buscando para eliminar.",
      });
    }

    await taskDelete.destroy();
    res.status(200).json({ message: "La tarea fue eliminada correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
