import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UsersModel } from "../../models/users.model.js";
import { customError } from "../../utils/customError.js";

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.findOne({ email: email.toLowerCase() });
    if (!user) customError(404, "No user found, Please Sign Up!");
    const match = await bcrypt.compare(password, user.password);
    if (!match) customError(401, "Invalid Credentials!");
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
    const { password: passwordHash, ...data } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "successfully signed in!",
      data,
    });
  } catch (error) {
    console.log("error in signing in!");
    next(error);
  }
};
