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

    const userIdExists = await UserModel.findByPk(user_id);
    if (!user_id) {
      return res
        .status(400)
        .json({ message: "El ID del usuario no puede ser nulo." });
    }

    if (!userIdExists) {
      return res.status(404).json({
        message:
          "¡El usuario que esta buscando para vincular la tarea no fue encontrado!",
      });
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

// export const getUserTasks = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await UserModel.findByPk(id, {
//       attributes: { exclude: ["password", "user_id"] },
//       include: [
//         {
//           model: UserModel,
//           as: "author",
//         },
//       ],
//     });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "¡El usuario que esta buscando no fue encontrado!" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error interno del servidor." });
//   }
// };
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID la tarea no puede ser nulo." });
    }
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
    const { id } = req.params;
    const { title, description, user_id } = req.body;
    let { isComplete } = req.body;

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

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID de la tarea no puede ser nulo." });
    }

    if (!taskUpdateExists) {
      return res.status(404).json({
        message:
          "¡El ID de la tarea que esta buscando para actualizar no fue encontrado!",
      });
    }

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
    const userIdExists = await UserModel.findByPk(user_id);
    if (!user_id) {
      return res
        .status(400)
        .json({ message: "El ID del usuario no puede ser nulo." });
    }

    if (!userIdExists) {
      return res.status(404).json({
        message:
          "¡El usuario que esta buscando para vincular la tarea no fue encontrado!",
      });
    }

    await taskUpdateExists.update({ title, description, isComplete, user_id });
    return res.status(200).json(taskUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskDeleteExists = await TaskModel.findByPk(id);

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID de la tarea no puede ser nulo." });
    }

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
