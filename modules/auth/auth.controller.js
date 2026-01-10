import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../../utils/token.js";
import { ROLES } from "../../constants/roles.js";
import mongoose from "mongoose";

export const register = async (req, res, next) => {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();

  try {
    const { name, email, password } = req.body;
    console.log("Request", req.body);

    if (!name || !email || !password) {
      const error = new Error("name, email and password are required");
      error.statusCode = 400;
      throw error;
    }
    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("Email already in use");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: ROLES.CLIENT,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error)
  }
};



export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    // Generate access token
    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role,
    })


    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        accessToken,
        user:  {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error)
  }
};
