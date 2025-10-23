import { DataTypes, Model } from "sequelize";

import sequelize from "../db";

const User = sequelize.define<
  Model<{
    id?: string;
    name: string;
    password: string;
    email: string;
  }>
>("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

export async function getUserCredentials(email: string) {
  try {
    const credentials = await User.findAll({
      attributes: ["email", "password", "id"],
      where: {
        email: email,
      },
    });

    if (!credentials || credentials.length === 0) {
      throw new Error("User not found");
    }

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

    if (!credentials || credentials.length === 0) {
      throw new Error("User not found");
    }

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

    if (!credentials || credentials.length === 0) {
      throw new Error("User not found");
    }

    return credentials[0].dataValues.email;
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

    if (!credentials || credentials.length === 0) {
      throw new Error("User not found");
    }

    return credentials[0].dataValues.id;
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
    });
  } catch (e: any) {
    if (e.errors && e.errors.length > 0 && e.errors[0].message === "email must be unique") {
      throw new Error("Email já cadastrado!");
    }
    if (e.message && e.message.includes("email must be unique")) {
      throw new Error("Email já cadastrado!");
    }
    throw new Error(e.message || "Erro ao criar usuário");
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
