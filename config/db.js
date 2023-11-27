import mongoose from "mongoose";

export const connection = (url) => {
  return mongoose.connect(url);
};
