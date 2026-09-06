import { matchedData } from "express-validator";
import { RoleModel } from "../models/role.model.js";

export const createRole = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    await RoleModel.create(validatedData);
    return res.status(201).json(validatedData);
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
    const validatedData = matchedData(req);
    const { id } = validatedData;
    const roleIdExists = await RoleModel.findByPk(id);

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
    const validatedData = matchedData(req);

    const { id } = validatedData;

    const roleUpdateExists = await RoleModel.findByPk(id);

    if (!roleUpdateExists) {
      return res.status(404).json({
        message: "¡El rol que está buscando para actualizar no fue encontrado!",
      });
    }

    await roleUpdateExists.update(validatedData);

    await roleUpdateExists.reload();

    return res.status(201).json(roleUpdateExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { id } = validatedData;

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
