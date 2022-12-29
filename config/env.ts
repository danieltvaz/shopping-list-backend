import * as dotenv from "dotenv";

const envFile = `.${process.env.NODE_ENV}.env`;

dotenv.config({ path: envFile });

const env = {
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  DIALECT: process.env.DIALECT,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default env;
