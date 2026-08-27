import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

export const UserModel = sequelize.define(
  "user",
  {
    nameUser: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "People",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);

UserModel.belongsTo(PersonModel, { foreignKey: "person_id", as: "owner" });

PersonModel.hasOne(UserModel, { foreignKey: "person_id", as: "user" });
