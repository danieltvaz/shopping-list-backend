import { NextFunction, Request, Response } from "express";

export default function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, url } = req;

  let responseData = {};
  const oldJson = res.json;

  res.json = function (data) {
    responseData = data;
    return oldJson.call(this, data);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log({
      method,
      url,
      status: res.statusCode,
      duration: `${duration}ms`,
      response: JSON.stringify(responseData),
    });
  });

  next();
}
