import bodyParser from "body-parser";
import cors from "cors";
import env from "./config/env";
import express from "express";
import routes from "./routes";

const server = express();
const port = env.API_PORT;

server.use(cors());
server.use(bodyParser.json());

routes(server);

server.listen(port, () => {
  console.log(`Shopping list API listening on port ${port} with db: ${env.DATABASE}`);
});
