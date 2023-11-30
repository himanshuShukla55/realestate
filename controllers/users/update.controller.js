import { customError } from "../../utils/customError.js";
import { UsersModel } from "../../models/users.model.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
  try {
    if (req.userId !== req.params.id)
      customError(401, "You can only update your own account");
    if (req.body.password)
      req.body.password = bcrypt.hashSync(req.body.password, 4);
    const updatedUser = await UsersModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username?.toLowerCase(),
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...data } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
