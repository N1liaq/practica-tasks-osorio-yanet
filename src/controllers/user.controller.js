import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El user no debe ser vacío." });
    }

    if (name.length > 100) {
      return res
        .status(400)
        .json({ message: "El user no debe pasar los 100 caracteres." });
    }

    if (!email) {
      return res.status(400).json({ message: "El email no debe ser vacío." });
    }

    const emailExists = await UserModel.findOne({ where: { email } });
    console.log(emailExists);

    if (!emailExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("El valor ingresado ya existe.");
      return res.status(400).json({ message: "El email ya esta en uso." });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "La contraseña no debe estar vacía." });
    }
    if (password.length > 100) {
      return res
        .status(400)
        .json({ message: "La contraseña no debe pasar los 100 caracteres." });
    }

    const newUser = await UserModel.create({ name, email, password });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await UserModel.findByPk(id);

    if (!userId) {
      return res
        .status(400)
        .json({ message: "El usuario no existe o no fue encontrado." });
    }

    return res.status(200).json(userId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const UserUpdate = await UserModel.findByPk(id);
    if (!UserUpdate) {
      return res.status(404).json({ message: "El usuario no existe." });
    }
    if (!name) {
      return res.status(400).json({ message: "El user no debe ser vacío." });
    }

    if (name.length > 100) {
      return res
        .status(400)
        .json({ message: "El user no debe pasar los 100 caracteres." });
    }

    if (!email) {
      return res.status(400).json({ message: "El email no debe ser vacío." });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "La contraseña no debe estar vacía." });
    }
    if (password.length > 100) {
      return res
        .status(400)
        .json({ message: "La contraseña no debe pasar los 100 caracteres." });
    }

    await UserUpdate.update({ name, password, email });
    return res.status(200).json(UserUpdate);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await UserModel.findByPk(id);
    if (!userDelete) {
      return res
        .status(404)
        .json({ message: "No se encontró el usuario que esta buscando." });
    }

    await userDelete.destroy();
    res
      .status(200)
      .json({ message: "El usuario fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
