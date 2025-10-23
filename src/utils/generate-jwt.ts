import jwt from "jsonwebtoken";

export default function generateNewJwt(email: string, userId: number) {
  const newJwt = jwt.sign({ email, userId }, process.env.JWT_SECRET ?? "", { expiresIn: "1d" });
  return newJwt;
}
