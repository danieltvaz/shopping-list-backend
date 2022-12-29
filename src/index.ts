import "./db/models/index.js";

import * as dotenv from "dotenv";

import bodyParser from "body-parser";
import express from "express";
import routes from "./routes";

const envFile = `.${process.env.NODE_ENV}.env`;

dotenv.config({ path: envFile });

const server = express();
const port = 3000;

server.use(bodyParser.json());

routes(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
