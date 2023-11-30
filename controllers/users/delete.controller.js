import { UsersModel } from "../../models/users.model.js";
import { customError } from "../../utils/customError.js";

export const deleteUser = async (req, res, next) => {
  try {
    if (req.userId !== req.params.id)
      customError(401, "You can not delete another user's account");
    await UsersModel.findByIdAndDelete(req.params.id);
    res.status(200).clearCookie("accessToken").json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
