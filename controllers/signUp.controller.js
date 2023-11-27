import bcrypt from "bcrypt";
import { UsersModel } from "../models/users.model.js";

export const signUp = (req, res, next) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 4, async (err, hash) => {
    if (err) {
      console.log("error in creating hash!");
      next(err);
    }
    try {
      await UsersModel.create({
        username,
        email: email.toLowerCase(),
        password: hash,
      });
      res.status(201).send("successfully signed up!");
    } catch (error) {
      console.log("error in signing up!");
      next(error);
    }
  });
};
