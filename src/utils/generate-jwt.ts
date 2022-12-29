import jwt from "jsonwebtoken";

export default function generateNewJwt(email: string) {
  const newJwt = jwt.sign({ email }, process.env.JWT_SECRET ?? "", { expiresIn: "30d" });
  return newJwt;
}
