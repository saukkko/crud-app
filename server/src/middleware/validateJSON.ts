import type { Request, Response, NextFunction } from "express";

/**
 * TODO:
 * Add better validation/increase verbosity of error messages
 */
export const validateJSON = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (["GET", "HEAD"].includes(req.method.toUpperCase())) return next();
  try {
    JSON.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof Error)
      return next(JSON.stringify({ err: err.name, msg: err.message }, null, 2));
    next("error");
  }
};
