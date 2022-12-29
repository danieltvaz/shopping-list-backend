import { DataTypes, Model } from "sequelize";

import sequelize from "../src/db";

const User = sequelize.define<Model<{ id?: string; name: string; password: string; email: string; jwt: string }>>("User", {
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

export async function getUserEmail(email: string) {
  const credentials = await User.findAll({
    attributes: ["email"],
    where: {
      email: email,
    },
  });

  return credentials[0].dataValues.email;
}

export async function getUserJwt(email: string) {
  const credentials = await User.findAll({
    attributes: ["jwt"],
    where: {
      email: email,
    },
  });

  return credentials[0].dataValues.jwt;
}

export async function getUserId(email: string) {
  const credentials = await User.findAll({
    attributes: ["id"],
    where: {
      email: email,
    },
  });
  return credentials[0].dataValues.id;
}

export async function updateJwt(email: string, jwt: string) {
  await User.update(
    {
      jwt,
    },
    {
      where: {
        email,
      },
    }
  );
}

export async function newUser(name: string, email: string, password: string) {
  await User.create({
    name,
    email,
    password,
    jwt: "",
  });
}

export default User;
