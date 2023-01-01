import { DataTypes, Model, Sequelize } from "sequelize";

import sequelize from "../src/db";

const User = sequelize.define<
  Model<{
    id?: string;
    name: string;
    password: string;
    email: string;
    jwt: string;
  }>
>("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  jwt: DataTypes.STRING,
});

export async function getUserCredentials(email: string) {
  try {
    const credentials = await User.findAll({
      attributes: ["email", "password"],
      where: {
        email: email,
      },
    });

    return credentials[0].dataValues;
  } catch (e: any) {
    throw new Error("User not found");
  }
}

export async function getUserName(email: string) {
  try {
    const credentials = await User.findAll({
      attributes: ["name"],
      where: {
        email: email,
      },
    });

    return credentials[0].dataValues.name;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserEmail(email: string) {
  try {
    const credentials = await User.findAll({
      attributes: ["email"],
      where: {
        email: email,
      },
    });

    return credentials[0].dataValues.email;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserJwt(email: string) {
  try {
    const credentials = await User.findAll({
      attributes: ["jwt"],
      where: {
        email: email,
      },
    });

    return credentials[0].dataValues.jwt;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserId(email: string) {
  try {
    const credentials = await User.findAll({
      attributes: ["id"],
      where: {
        email: email,
      },
    });
    return credentials[0].dataValues.id;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateJwt(email: string, jwt: string) {
  try {
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
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function newUser(name: string, email: string, password: string) {
  try {
    await User.create({
      name,
      email,
      password,
      jwt: "",
    });
  } catch (e: any) {
    if (e.errors[0].message === "email must be unique") {
      throw new Error("Email já cadastrado!");
    }
    throw new Error(e.message);
  }
}

export async function getAllUsers() {
  try {
    const users = await User.findAll({
      attributes: ["*"],
    });

    return users;
  } catch (e: any) {
    throw new Error(e);
  }
}

export default User;
