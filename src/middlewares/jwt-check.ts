import { NextFunction, Request, Response } from "express";

import { Jwt } from "../types/jwt";
import { ROUTE_RESPONSE_MESSAGE } from "../constants/status-messages";
import env from "../../config/env";
import { getUserJwt } from "../../models/user";
import jwt from "jsonwebtoken";

export default async function jwtCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const requestJwt = req.headers.authorization as string;
    const decodedRequestJwt = (jwt?.decode(requestJwt) as Jwt) ?? null;
    const userJwt = decodedRequestJwt ? await getUserJwt(decodedRequestJwt.email) : null;
    const now = Math.floor(new Date().getTime() / 1000);

    const equalJwt = requestJwt === userJwt;
    const validJwt = jwt.verify(requestJwt, env.JWT_SECRET ?? "");
    const validDateJwt = Number(decodedRequestJwt.exp) ?? 0 < now;

    if (!requestJwt || !equalJwt || !validJwt || !validDateJwt) {
      res.status(401).json({
        code: ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.code,
        message: ROUTE_RESPONSE_MESSAGE.ROUTE_SIGNIN_ERROR.statusMessage,
      });
    } else {
      next();
    }
  } catch {
    throw new Error("An error has ocurred");
  }
}
