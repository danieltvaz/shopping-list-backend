import { DataTypes, Model } from "sequelize";

import sequelize from "../db";

const User = sequelize.define<Model<{ name: string; password: string; email: string }>>("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

export default User;
