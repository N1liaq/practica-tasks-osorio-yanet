import { UserModel } from "../models/user.model.js";
import { PersonModel } from "../models/person.model.js";

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

    if (!person_id) {
      return res.status(400).json({
        message: "El ID de la persona no puede ser nulo.",
      });
    }

    const personExists = await PersonModel.findByPk(person_id);
    if (!personExists) {
      return res.status(400).json({
        message:
          "¡La persona que esta buscando para vincular su usuario no existe!",
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
    const { nameUser, email, password, person_id } = req.body;

    const userUpdate = await UserModel.findByPk(id);
    if (!userUpdate) {
      return res.status(404).json({ message: "El usuario no existe." });
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

    await userUpdate.update({ nameUser, password, email, person_id });
    return res.status(200).json(userUpdate);
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
      return res.status(404).json({
        message:
          "No se encontró el usuario que se está buscando para eliminar.",
      });
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
