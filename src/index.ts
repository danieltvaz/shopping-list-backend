import bodyParser from "body-parser";
import express from "express";
import routes from "./routes";

const server = express();
const port = 3000;

server.use(bodyParser.json());

routes(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
