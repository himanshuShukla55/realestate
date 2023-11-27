import express from "express";
import { signUp } from "../controllers/signUp.controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
