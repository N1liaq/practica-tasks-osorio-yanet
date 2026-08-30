import { UserModel } from "../models/user.model.js";
import { PersonModel } from "../models/person.model.js";
import { TaskModel } from "../models/task.model.js";
export const createUser = async (req, res) => {
  try {
    const { nameUser, email, password, person_id } = req.body;

    if (!nameUser) {
      return res.status(400).json({ message: "El usuario no puede ser nulo." });
    }

    const nameUserExists = await UserModel.findOne({ where: { nameUser } });
    console.log(nameUserExists);

    if (!nameUserExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("El valor ingresado ya existe.");
      return res
        .status(400)
        .json({ message: "Este nombre de usuario ya está en uso." });
    }

    if (nameUser.length > 100) {
      return res
        .status(400)
        .json({ message: "El usuario no debe pasar los 100 carácteres." });
    }

    if (!email) {
      return res.status(400).json({ message: "El email no puede ser nulo." });
    }

    const emailExists = await UserModel.findOne({ where: { email } });
    console.log(emailExists);

    if (!emailExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("El valor ingresado ya existe.");
      return res.status(400).json({ message: "El email ya está en uso." });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "La contraseña no puede ser nula." });
    }
    if (password.length > 100) {
      return res
        .status(400)
        .json({ message: "La contraseña no debe pasar los 100 carácteres." });
    }

    const personExists = await PersonModel.findByPk(person_id);
    if (!person_id) {
      return res
        .status(400)
        .json({ message: "El ID de la persona no puede ser nulo." });
    }
    if (!personExists) {
      return res.status(404).json({
        message:
          "¡La persona que esta buscando para vincular su usuario no fue encontrada!",
      });
    }

    const { id } = req.params;

    const personIdExists = await UserModel.findByPk(id);
    if (personIdExists) {
      return res.status(400).json({
        message: "¡Está persona ya tiene un usuario!",
      });
    }

    const newUser = await UserModel.create({
      nameUser,
      email,
      password,
      person_id,
    });

    return res.status(201).json(newUser);
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

    // if (!users) {
    //   return res
    //     .status(404)
    //     .json({ message: "No hay usuarios ingresados actualmente." });
    // }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          as: "tareas",
        },
      ],
    });

    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ message: "¡El usuario que está buscando no fue encontrado!" });
    // }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID del usuario no puede ser nulo." });
    }

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
      return res.status(404).json({
        message: "¡El usuario que esta buscando no fue encontrado!",
      });
    }

    return res.status(200).json(UserIdExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameUser, email, password, person_id } = req.body;

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

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID del usuario no puede ser nulo." });
    }

    if (!userUpdateExists) {
      return res.status(404).json({
        message:
          "¡El ID del usuario que esta buscando para actualizar no fue encontrado!",
      });
    }

    if (!nameUser) {
      return res.status(400).json({ message: "El usuario no puede ser nulo." });
    }

    const nameUserExists = await UserModel.findOne({ where: { nameUser } });
    console.log(nameUserExists);

    if (!nameUserExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("El valor ingresado ya existe.");
      return res
        .status(400)
        .json({ message: "Este nombre de usuario ya está en uso." });
    }

    if (nameUser.length > 100) {
      return res
        .status(400)
        .json({ message: "El usuario no debe pasar los 100 carácteres." });
    }

    if (!email) {
      return res.status(400).json({ message: "El email no puede ser nulo." });
    }

    const emailExists = await UserModel.findOne({ where: { email } });
    console.log(emailExists);

    if (!emailExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("El valor ingresado ya existe.");
      return res.status(400).json({ message: "El email ya está en uso." });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "La contraseña no debe ser nula." });
    }
    if (password.length > 100) {
      return res
        .status(400)
        .json({ message: "La contraseña no debe pasar los 100 carácteres." });
    }

    const personExists = await PersonModel.findByPk(person_id);
    if (!person_id) {
      return res
        .status(400)
        .json({ message: "El ID de la persona no puede ser nulo." });
    }
    if (!personExists) {
      return res.status(404).json({
        message:
          "¡La persona que esta buscando para vincular su usuario no fue encontrada!",
      });
    }

    const personIdExists = await UserModel.findByPk(person_id);
    if (personIdExists) {
      return res.status(400).json({
        message: "¡Está persona ya tiene un usuario!",
      });
    }

    await userUpdateExists.update({ nameUser, password, email, person_id });
    return res.status(200).json(userUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDeleteExists = await UserModel.findByPk(id);

    if (!id) {
      return res
        .status(404)
        .json({ message: "El ID del usuario no puede ser nulo." });
    }

    if (!userDeleteExists) {
      return res.status(404).json({
        message:
          "¡El ID del usuario que esta buscando para eliminar no fue encontrado!",
      });
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
