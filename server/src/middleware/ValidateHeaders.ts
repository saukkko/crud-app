import type { Request, Response, NextFunction } from "express";

/**
 * TODO:
 * Do the actual validation too, not just printing
 */
export const validateHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`
  Host:....................${req.headers.host}
  X-Real-IP:...............${req.headers["x-real-ip"]}
  X-Forwarded-For:.........${req.headers["x-forwarded-for"]}
  X-NginX-Proxy:...........${req.headers["x-nginx-proxy"]}
  Proxy-Authenticate:......${req.headers["proxy-authenticate"]}
  Proxy-Authorization:.....${req.headers["proxy-authorization"]}
  `);

  return next();
};
