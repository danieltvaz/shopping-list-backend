import { Sequelize } from "sequelize";

const sequelize = new Sequelize("listadecompras", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
