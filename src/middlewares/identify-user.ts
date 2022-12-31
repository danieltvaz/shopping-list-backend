import { NextFunction, Request, Response } from "express";
import User, { getUserId, getUserJwt } from "../../models/user";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

import { Jwt } from "../types/jwt";
import { ROUTE_RESPONSE_MESSAGE } from "../constants/status-messages";
import env from "../../config/env";

export default async function identifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const requestJwt = req.headers.authorization as string | undefined;

    if (requestJwt) {
      const decodedRequestJwt = (jwt.decode(requestJwt) as Jwt) ?? null;
      const userEmail = decodedRequestJwt.email;
      const userId = await getUserId(userEmail);

      req.headers.user = JSON.stringify({
        email: userEmail,
        id: userId,
      });

      next();
    } else throw new Error("An error has ocurred");
  } catch {
    throw new Error("An error has ocurred");
  }
}
