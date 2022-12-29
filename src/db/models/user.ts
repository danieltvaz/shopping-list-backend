import { DataTypes, Model } from "sequelize";

import sequelize from "../db";

const User = sequelize.define<Model<{ name: string; password: string; email: string; jwt: string }>>("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  jwt: DataTypes.STRING,
});

export async function getUserCredentials(email: string) {
  const credentials = await User.findAll({
    attributes: ["email", "password"],
    where: {
      email: email,
    },
  });

  return credentials[0].dataValues;
}

export async function getUserName(email: string) {
  const credentials = await User.findAll({
    attributes: ["name"],
    where: {
      email: email,
    },
  });

  return credentials[0].dataValues.name;
}

export default User;
