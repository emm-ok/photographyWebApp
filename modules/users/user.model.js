import mongoose from "mongoose";
import { ROLES } from "../../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },

    email: {
      type: String,
      required: [true, 'User Email is required'],
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, 'User Password is required'],
      select: false,
      minLength: 6,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CLIENT,
      index: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
