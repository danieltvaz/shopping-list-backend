import { Dialect, Sequelize } from "sequelize";

import env from "../../config/env";

const sequelize = new Sequelize("listadecompras", "root", "", {
  host: env.HOST,
  dialect: (env.DIALECT as Dialect) ?? "mysql",
});

export default sequelize;
