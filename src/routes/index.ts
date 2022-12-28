import { DB_RESPONSE_MESSAGE, ROUTE_RESPONSE_MESSAGE } from "../constants/status-messages";

import { Express } from "express";
import User from "../db/models/user";

export default function routes(server: Express) {
  server.get("/", (req, res) => {
    res.send("Hello World!");
  });

  server.post("/auth/signin", (req, res) => {
    console.log(req.body.email, req.body.password);
    res.sendStatus(200);
  });

  server.post("/auth/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (email && password && name) {
      try {
        await User.create({
          name,
          email,
          password,
        });
        res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.code).json({
          statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.statusMessage,
          message: "Account succesfully created",
        });
      } catch {
        res.status(DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.code).json({
          statusMessage: DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.statusMessage,
          message: "An error ocurred",
        });
      }
    } else {
      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_INSUFICIENT_DATA.code).json({
        statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_INSUFICIENT_DATA.statusMessage,
        message: "Missing required data",
      });
    }
  });
}
