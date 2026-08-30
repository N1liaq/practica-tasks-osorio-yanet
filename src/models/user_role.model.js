import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { UserModel } from "./user.model";
import { RoleModel } from "./role.model";

export const UserRoleModel = sequelize.define(
  "User_role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "User",
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "Role",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);

UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  foreignKey: "user_id",
  as: "roles",
});

RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  foreignKey: "role_id",
  as: "users",
});
