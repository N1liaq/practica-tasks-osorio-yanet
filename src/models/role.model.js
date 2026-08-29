import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const RoleModel = sequelize.define(
  "Role",
  {
    roleName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
