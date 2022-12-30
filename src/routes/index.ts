import { DB_RESPONSE_MESSAGE, ROUTE_RESPONSE_MESSAGE } from "../constants/status-messages";
import Product, { getProducts, newProduct, removeProduct, updateProduct } from "../../models/product";
import User, { getUserCredentials, getUserEmail, getUserName, newUser, updateJwt } from "../../models/user";

import { Error } from "sequelize";
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
      const email = req.body.email.toLowerCase();
      const password = req.body.password.toLowerCase();

      const { email: userEmail, password: userPassword } = await getUserCredentials(email);

      if (email === userEmail.toLowerCase() && password === userPassword.toLowerCase()) {
        const jwt = generateNewJwt(email);
        const userName = await getUserName(email);

        await updateJwt(email, jwt);

        res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_SUCCESS.code).json({
          name: userName,
          email: userEmail,
          jwt,
        });
      } else {
        res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.code).json({
          statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.statusMessage,
          message: "Invalid email or password",
        });
      }
    } catch (e: any) {
      res.status(DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.code).json({
        statusMessage: DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.statusMessage,
        message: e.message,
      });
    }
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

      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.code).json({
        statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.statusMessage,
        message: "Product succesfully added.",
      });
    } catch {
      res.status(DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.code).json({
        statusMessage: DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.statusMessage,
        message: "An error has ocurred",
      });
    }
  });

  server.get("/list/products", jwtCheck, identifyUser, async (req, res) => {
    try {
      const userId = JSON.parse(req.headers.user as any).id;

      const products = await getProducts(userId);

      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.code).json({
        statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.statusMessage,
        data: products,
      });
    } catch {
      res.status(DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.code).json({
        statusMessage: DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.statusMessage,
        message: "An error has ocurred",
      });
    }
  });

  server.put("/list/products", jwtCheck, identifyUser, async (req, res) => {
    try {
      const newProduct = req.body.product;
      const userId = JSON.parse(req.headers.user as any).id;

      await updateProduct(newProduct, userId);

      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.code).json({
        statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.statusMessage,
        message: "Product updated succesfully",
      });
    } catch {
      res.status(DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.code).json({
        statusMessage: DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.statusMessage,
        message: "An error has ocurred",
      });
    }
  });

  server.delete("/list/products", jwtCheck, identifyUser, async (req, res) => {
    try {
      const productId = req.body.productId;
      const userId = JSON.parse(req.headers.user as any).id;

      await removeProduct(productId, userId);

      res.status(ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.code).json({
        statusMessage: ROUTE_RESPONSE_MESSAGE.ROUTE_SUCCESS.statusMessage,
        message: "Product removed succesfully",
      });
    } catch {
      res.status(DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.code).json({
        statusMessage: DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.statusMessage,
        message: "An error has ocurred",
      });
    }
  });
}
