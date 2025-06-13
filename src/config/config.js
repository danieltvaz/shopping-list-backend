const dotenv = require("dotenv");

const envFile = `.${process.env.NODE_ENV}.env`;

dotenv.config({ path: envFile });

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: process.env.DB_DIALECT,
    PORT: process.env.MYSQL_PORT,
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: process.env.DB_DIALECT,
    PORT: process.env.MYSQL_PORT,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: process.env.DB_DIALECT,
    PORT: process.env.MYSQL_PORT,
  },
};
