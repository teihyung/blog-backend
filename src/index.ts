import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 8000;

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello typescript nodejs server what is going on");
});

app.listen(port, "0.0.0.0",() => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});