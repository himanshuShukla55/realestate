import { customError } from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) customError(401, "Unauthorized!");
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) customError(403, "Forbidden!");
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
};
