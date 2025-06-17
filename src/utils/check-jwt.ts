import jwt from "jsonwebtoken";

export default function checkJwt(token: string, secret: string) {
  try {
    const newJwt = jwt.verify(token, secret ?? "") as jwt.JwtPayload;
    return newJwt;
  } catch {
    return false;
  }
}
