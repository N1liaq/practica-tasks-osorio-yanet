import { RoleModel } from "../models/role.model";

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

    const roleNameExists = await roleName.findOne({ where: { roleName } });

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
    return res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const roleId = await RoleModel.findByPk(id);

    if (!roleId) {
      return res.status(400).json("El ID no debe ser nulo.");
    }

    const roleIdExists = await RoleModel.findByPk(id);
    if (!roleIdExists) {
      console.log("el valor es nulo.");
    } else {
      return res
        .status(400)
        .json({ message: "¡El rol que esta buscando no existe!" });
    }
    return res.status(200).json(roleId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName } = req.body;

    const roleUpdate = await RoleModel.findByPk(id);

    if (!roleUpdate) {
      return res.status(400).json("El ID no debe ser nulo.");
    }

    const roleIdExists = await RoleModel.findByPk(id);
    if (!roleIdExists) {
      console.log("el valor es nulo.");
    } else {
      return res.status(400).json({
        message: "¡El ID del rol que esta buscando para actualizar no existe!",
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

    const roleNameExists = await roleName.findOne({ where: { roleName } });

    if (!roleNameExists) {
      console.log("El valor es nulo.");
    } else {
      console.log("el valor ingresado existe.");
      return res
        .status(400)
        .json({ message: "Este rol que ingresó ya existe." });
    }
    await roleUpdate.update({ roleName });
    return res.status(200).json(roleUpdate);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const RoleDeleteExists = await RoleModel.findByPk(id);

    if (!userDelete) {
      return res.status(400).json("El ID no debe ser nulo.");
    }

    if (!RoleDeleteExists) {
      console.log("el valor es nulo.");
    } else {
      return res.status(400).json({
        message: "¡El ID del rol que esta buscando para eliminar no existe!",
      });
    }
    await RoleDeleteExists.destroy();
    res.status(200).json({ message: "El rol fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
