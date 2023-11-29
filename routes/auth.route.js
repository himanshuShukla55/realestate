import express from "express";
import { signIn, signUp, google } from "../controllers/auth/index.js";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/google", google);
