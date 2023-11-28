import express from "express";
import { signIn, signUp } from "../controllers/auth/index.js";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
