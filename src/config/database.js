import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const database = process.env.BD;
const usuarioBD = process.env.USUARIOBD;
const contraseñaBD = process.env.CONTRASEÑABD;
const hostBD = process.env.HOSTBD;
const dialectBD = process.env.DIALECTBD;

export const sequelize = new Sequelize(database, usuarioBD, contraseñaBD, {
  host: hostBD,
  dialect: dialectBD,
});

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Conexión a la BD esta lista.");
  } catch (error) {
    console.error("No se pudo conectar a la BD:", error);
  }
};
