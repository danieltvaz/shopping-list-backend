import { DB_RESPONSE_MESSAGE, ROUTE_RESPONSE_MESSAGE } from "../constants/status-messages";
import Product, { getProducts, newProduct } from "../../models/product";
import User, { getUserCredentials, getUserEmail, getUserName, newUser, updateJwt } from "../../models/user";

import { Express } from "express";
import generateNewJwt from "../utils/generate-jwt";
import identifyUser from "../middlewares/identify-user";
import jwtCheck from "../middlewares/jwt-check";

export default function routes(server: Express) {
  server.get("/", (req, res) => {
    res.send("Hello World!");
  });

  server.post("/auth/signin", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const { email: userEmail, password: userPassword } = await getUserCredentials(email);
      const userName = await getUserName(email);

      if (email === userEmail && password === userPassword) {
        const jwt = generateNewJwt(email);

        await updateJwt(email, jwt);

        res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_SUCCESS.code).json({
          name: userName,
          email: userEmail,
          jwt,
        });
      } else {
        res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.code).json({
          statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.statusMessage,
          message: "Wrong email or password",
        });
      }
    } catch {}
  });

  server.post("/auth/signup", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const name = req.body.name;

      if (email && password && name) {
        await newUser(name, email, password);

        res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.code).json({
          statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.statusMessage,
          message: "Account succesfully created",
        });
      } else {
        res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_INSUFICIENT_DATA.code).json({
          statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_INSUFICIENT_DATA.statusMessage,
          message: "Missing required data",
        });
      }
    } catch {}
  });

  server.post("/list/products", jwtCheck, identifyUser, async (req, res) => {
    try {
      const productName = req.body.productName;
      const userId = JSON.parse(req.headers.user as any).id;

      await newProduct(productName, userId);

      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_INSUFICIENT_DATA.code).json({
        statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.statusMessage,
        message: "Product succesfully added.",
      });
    } catch {}
  });

  server.get("/list/products", jwtCheck, identifyUser, async (req, res) => {
    try {
      const userId = JSON.parse(req.headers.user as any).id;

      const products = await getProducts(userId);

      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.code).json({
        statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.statusMessage,
        data: products,
      });
    } catch {}
  });
}
