import express from "express";
import { updateUser, deleteUser, getUser } from "../controllers/users/index.js";
import { authenticate } from "../middlewares/auth.js";

export const usersRouter = express.Router();

usersRouter.use(authenticate);

usersRouter.post("/update/:id", updateUser);
usersRouter.delete("/delete/:id", deleteUser);
usersRouter.get("/:id", getUser);
