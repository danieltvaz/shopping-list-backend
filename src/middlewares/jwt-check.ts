import { DB_RESPONSE_MESSAGE, ROUTE_RESPONSE_MESSAGE } from "../constants/status-messages";
import { NextFunction, Request, Response } from "express";
import { getUserId, getUserJwt } from "../models/user";

import { Jwt } from "../types/jwt";
import checkJwt from "../utils/check-jwt";
import env from "../config/env";
import jwt from "jsonwebtoken";

export default async function jwtCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const requestJwt = req.headers.authorization as string | undefined;

    if (requestJwt) {
      const validJwt = checkJwt(requestJwt, env.JWT_SECRET);

      if (!validJwt) {
        res.status(401).json({
          code: ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.code,
          message: "Invalid token",
        });
      } else {
        const userEmail = validJwt.email;
        const userId = await getUserId(userEmail);

        req.headers.user = JSON.stringify({
          email: userEmail,
          id: userId,
        });

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
