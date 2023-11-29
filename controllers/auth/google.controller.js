import { UsersModel } from "../../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    //* check if user already exist
    let user = await UsersModel.findOne({ email });

    //* if user does not exist
    if (!user) {
      //* generate a password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      //* hash the password
      const passwordHash = bcrypt.hashSync(generatedPassword, 10);
      //* create a new user document
      user = await UsersModel.create({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email,
        password: passwordHash,
        avatar: photo,
      });
    }
    //generate a token and set it in a cookie
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
    const { password, ...data } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "successfully signed in through Google OAuth!",
      data,
    });
  } catch (error) {
    console.log("error in google oauth");
    next(error);
  }
};
