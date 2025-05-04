import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Replace with real validation and DB check
  if (email === "test@example.com" && password === "password") {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};