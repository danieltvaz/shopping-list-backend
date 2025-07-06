import { Dialect, Sequelize } from "sequelize";

import env from "../config/env";

const sequelize = new Sequelize(env.DATABASE, env.USERNAME, env.PASSWORD, {
  host: env.HOST,
  dialect: (env.DIALECT as Dialect) ?? "mysql",
  logging: false,
});

export default sequelize;
