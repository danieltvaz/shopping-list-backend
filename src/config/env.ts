import * as dotenv from "dotenv";

const envFile = `.env`;

dotenv.config({ path: envFile });

const env = {
  USERNAME: process.env.MYSQL_USER as string,
  PASSWORD: process.env.MYSQL_PASSWORD as string,
  DATABASE: process.env.MYSQL_DATABASE as string,
  HOST: process.env.MYSQL_HOST as string,
  DIALECT: process.env.DB_DIALECT as string,
  PORT: process.env.MYSQL_PORT as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  API_PORT: process.env.API_PORT,
};

export default env;
