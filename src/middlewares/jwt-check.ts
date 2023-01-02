import {
  DB_RESPONSE_MESSAGE,
  ROUTE_RESPONSE_MESSAGE,
} from "../constants/status-messages";
import { NextFunction, Request, Response } from "express";

import { Jwt } from "../types/jwt";
import env from "../config/env";
import { getUserJwt } from "../models/user";
import jwt from "jsonwebtoken";

export default async function jwtCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const requestJwt = req.headers.authorization as string | undefined;

    if (requestJwt) {
      const decodedRequestJwt = jwt.decode(requestJwt) as Jwt;

      const userJwt = await getUserJwt(decodedRequestJwt.email);

      const now = Math.floor(new Date().getTime() / 1000);

      const equalJwt = requestJwt === userJwt;
      const validJwt = jwt.verify(requestJwt, env.JWT_SECRET);
      const expiredJwt = Number(decodedRequestJwt.exp) < now;

      console.log(equalJwt, validJwt, expiredJwt);

      if (!equalJwt || !validJwt || expiredJwt) {
        res.status(401).json({
          code: ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.code,
          message: "Invalid token",
        });
      } else {
        next();
      }
    } else
      res.status(401).json({
        code: ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.code,
        message: "Missing token",
      });
  } catch {
    res.status(500).json({
      code: DB_RESPONSE_MESSAGE.INSERT_DB_ERROR.code,
      message: "Cannot get data",
    });
  }
}
