import { UserModel } from "../models/user.model.js";
import { UserRoleModel } from "../models/user_role.model.js";
import { RoleModel } from "../models/role.model.js";
import { matchedData } from "express-validator";

export const createUserRol = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { user_id, role_id } = validatedData;

    if (user_id && role_id) {
      const relationExists = await UserRoleModel.findOne({
        where: { user_id, role_id },
      });
      if (relationExists) {
        return res.status(400).json("El usuario ya tiene asignado este rol.");
      }
    }
    await UserRoleModel.create(validatedData);

    return res.status(201).json(validatedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllUserRol = async (req, res) => {
  try {
    const allUserRole = await UserRoleModel.findAll({
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: { exclude: ["password"] },
        },
        {
          model: RoleModel,
          as: "roles",
        },
      ],
    });
    return res.status(200).json(allUserRole);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getUserRolById = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const userRole = await UserRoleModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: { exclude: ["password"] },
        },
        {
          model: RoleModel,
          as: "roles",
        },
      ],
    });

    return res.status(200).json(userRole);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateUserRol = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const userRoleUpdateExists = await UserRoleModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: { exclude: ["password"] },
        },
        {
          model: RoleModel,
          as: "roles",
        },
      ],
    });

    if (!userRoleUpdateExists) {
      return res.status(400).json({
        message:
          "¡El ID del userRole que está buscando para utilizar no fue encontrado!",
      });
    }
    await userRoleUpdateExists.update(validatedData);

    await userRoleUpdateExists.reload();

    return res.status(200).json(userRoleUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteUserRol = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;
    const userRoleDeleteExists = await UserRoleModel.findByPk(id);

    if (!userRoleDeleteExists) {
      return res.status(400).json({
        message:
          "¡El ID del usuarioRol que está buscando para eliminar no fue encontrado!",
      });
    }

    await userRoleDeleteExists.destroy();
    res
      .status(200)
      .json({ message: "El ID del userRole fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
