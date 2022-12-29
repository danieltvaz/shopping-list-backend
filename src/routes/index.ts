import { DB_RESPONSE_MESSAGE, ROUTE_RESPONSE_MESSAGE } from "../constants/status-messages";
import User, { getUserCredentials, getUserName } from "../db/models/user";

import { Express } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "#Rahaaon3852";

export default function routes(server: Express) {
  server.get("/", (req, res) => {
    res.send("Hello World!");
  });

  server.post("/auth/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { email: userEmail, password: userPassword } = await getUserCredentials(email);
    const userName = await getUserName(email);

    if (email === userEmail && password === userPassword) {
      const newJwt = jwt.sign({}, SECRET, { expiresIn: "30d" });

      await User.update(
        {
          jwt: newJwt,
        },
        {
          where: {
            email: email,
          },
        }
      );

      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_SUCCESS.code).json({
        name: userName,
        jwt: newJwt,
      });
    } else {
      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.code).json({
        statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.statusMessage,
        message: "Wrong email or password",
      });
    }
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
          jwt: "",
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
