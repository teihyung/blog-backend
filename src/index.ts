import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js'
import authRoutes from "./auth/routes/authRoutes";
import { authenticateToken } from "./middleware/auth";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 8000;

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello typescript nodejs server what is going on");
});

app.use("/auth", authRoutes);

app.use(authenticateToken);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});