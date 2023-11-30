import express from "express";
import { updateUser } from "../controllers/users/update.controller.js";

export const usersRouter = express.Router();

usersRouter.post("/update/:id", updateUser);
