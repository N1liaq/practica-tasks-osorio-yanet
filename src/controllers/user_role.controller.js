import { UserModel } from "../models/user.model.js";
import { UserRoleModel } from "../models/user_role.model.js";
import { RoleModel } from "../models/role.model.js";

export const createUserRol = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    const { id } = req.params;

    const userExists = await UserModel.findByPk(id);

    const roleExists = await RoleModel.findByPk(id);

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID del usuario no puede ser nulo." });
    }

    if (!userExists) {
      return res.status(404).json({
        message: "¡El usuario que está buscando no fue encontrado!",
      });
    }

    if (!roleExists) {
      return res.status(404).json({
        message: "¡El rol que está buscando no fue encontrado!",
      });
    }

    const newUserRole = await UserModel.create({
      user_id,
      role_id,
    });

    return res.status(201).json(newUserRole);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const getAllUserRol = async (req, res) => {
  try {
    const allUserRole = await UserRoleModel.findAll();
    return res.status(200).json(allUserRole);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const getUserRolById = async (req, res) => {
  try {
    const { id } = req.params;

    const userRole = await UserRoleModel.findByPk(id);

    return res.status(200).json(userRole);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const updateUserRol = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    const { id } = req.params;

    const userRoleUpdateExists = await UserRoleModel.findByPk(id);

    const userExists = await UserModel.findByPk(id);

    const roleExists = await RoleModel.findByPk(id);

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID del usuario no puede ser nulo." });
    }

    if (!userExists) {
      return res.status(404).json({
        message: "¡El usuario que está buscando no fue encontrado!",
      });
    }

    if (!roleExists) {
      return res.status(404).json({
        message: "¡El rol que está buscando no fue encontrado!",
      });
    }

    if (!userRoleUpdateExists) {
      return res.status(404).json({
        message:
          "¡El ID del usuarioRol que está buscando para utilizar no fue encontrado!",
      });
    }
    await userRoleUpdateExists.update({ user_id, role_id });
    return res.status(200).json(userRoleUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteUserRol = async (req, res) => {
  try {
    const { id } = req.params;
    const userRoleDeleteExists = await UserRoleModel.findByPk(id);

    if (!userRoleDeleteExists) {
      return res.status(404).json({
        message:
          "¡El ID del usuarioRol que está buscando para eliminar no fue encontrado!",
      });
    }

    await userRoleDeleteExists.destroy();
    res.status(200).json({ message: "El ID fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
