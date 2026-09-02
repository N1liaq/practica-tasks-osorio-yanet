import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";

export const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    if (!roleName) {
      return res.status(400).json({ message: "El rol no puede ser nulo." });
    }

    if (roleName.length > 100) {
      return res
        .status(400)
        .json({ message: "El rol no puede pasar los 100 carácteres." });
    }

    const roleNameExists = await RoleModel.findOne({ where: { roleName } });

    if (!roleNameExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("el valor ingresado existe.");
      return res
        .status(400)
        .json({ message: "Este rol que ingresó ya existe." });
    }

    const newRole = await RoleModel.create({
      roleName,
    });

    return res.status(201).json(newRole);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll();

    // if (!roles) {
    //   return res
    //     .status(404)
    //     .json({ message: "No hay roles ingresados actualmente." });
    // }

    return res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const roleIdExists = await RoleModel.findByPk(id);
    if (!id) {
      return res.status(400).json("El ID del rol no puede ser nulo.");
    }
    if (!roleIdExists) {
      return res
        .status(404)
        .json({ message: "¡El rol que está buscando no fue encontrado!" });
    }
    return res.status(200).json(roleIdExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName } = req.body;

    if (!id) {
      return res.status(400).json("El ID del rol no puede ser nulo.");
    }

    const roleUpdateExists = await RoleModel.findByPk(id);

    if (!roleUpdateExists) {
      return res.status(404).json({
        message: "¡El rol que está buscando para actualizar no fue encontrado!",
      });
    }

    if (!roleName) {
      return res.status(400).json({ message: "El rol no puede ser nulo." });
    }

    if (roleName.length > 100) {
      return res
        .status(400)
        .json({ message: "El rol no puede pasar los 100 carácteres." });
    }

    const roleNameExists = await RoleModel.findOne({ where: { roleName } });

    if (!roleNameExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("el valor ingresado existe.");
      return res
        .status(400)
        .json({ message: "Este rol que ingresó ya existe." });
    }

    await roleUpdateExists.update({ roleName });
    return res.status(200).json(roleUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("El ID del rol no puede ser nulo.");
    }
    const RoleDeleteExists = await RoleModel.findByPk(id);

    if (!RoleDeleteExists) {
      return res.status(404).json({
        message: "¡El rol que está buscando para actualizar no fue encontrado!",
      });
    }

    await RoleDeleteExists.destroy();
    res.status(200).json({ message: "El rol fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
