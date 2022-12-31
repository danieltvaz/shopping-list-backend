import { NextFunction, Request, Response } from "express";

export default function delayer(req: Request, res: Response, next: NextFunction) {
  setTimeout(() => {
    next();
  }, 1000);
}
