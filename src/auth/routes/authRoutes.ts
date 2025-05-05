import { Router } from "express";
import { signup, signin, editUserInfo } from "../controllers/authController";

const router = Router();

router.post("/signin", signin);

router.post("/signup", signup);

export default router;