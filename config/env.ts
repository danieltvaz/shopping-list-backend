import * as dotenv from "dotenv";

const envFile = `.${process.env.NODE_ENV}.env`;

dotenv.config({ path: envFile });

const env = {
  USERNAME: process.env.USERNAME as string,
  PASSWORD: process.env.PASSWORD as string,
  DATABASE: process.env.DATABASE as string,
  HOST: process.env.HOST as string,
  DIALECT: process.env.DIALECT as string,
  PORT: process.env.PORT as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

export default env;
