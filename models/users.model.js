import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg",
  },
});

export const UsersModel = model("user", UserSchema);
