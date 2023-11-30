import express from "express";
import { signIn, signUp, google, signOut } from "../controllers/auth/index.js";
import { authenticate } from "../middlewares/auth.js";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/google", google);
authRouter.get("/signout", authenticate, signOut);
