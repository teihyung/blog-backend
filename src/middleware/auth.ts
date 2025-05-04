import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "defaultsecret";

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = typeof authHeader === "string" ? authHeader.split(" ")[1] : undefined;

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token." });
  }
};
