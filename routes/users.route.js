import express from "express";
import { updateUser, deleteUser } from "../controllers/users/index.js";

export const usersRouter = express.Router();

usersRouter.post("/update/:id", updateUser);
usersRouter.delete("/delete/:id", deleteUser);
