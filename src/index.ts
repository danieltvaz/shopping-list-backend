import bodyParser from "body-parser";
import cors from "cors";
import env from "./config/env";
import express from "express";
import routes from "./routes";

const server = express();
const port = 4000;

server.use(cors());
server.use(bodyParser.json());

routes(server);

server.listen(port, () => {
  console.log(`Api lista de compras listening on port ${port} with db: ${env.DATABASE}`);
});
