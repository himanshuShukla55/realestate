import { UsersModel } from "../../models/users.model.js";
import { customError } from "../../utils/customError.js";

export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UsersModel.findOne({ _id: id });
    if (!user) customError(404, "user not found!");
    const { password, ...data } = user._doc;
    res.status(200).json({
      success: true,
      message: "user found!",
      data,
    });
  } catch (error) {
    console.log("error in getting user by id!");
    next(error);
  }
};
