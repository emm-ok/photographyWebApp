import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { env } from "../config/env.js";
import User from "../modules/users/user.model.js";
import { ROLES } from "../constants/roles.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);

    const adminEmail = "futlord77@gmail.com";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exist");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Futlordball.", 12);

    await User.create({
      name: "Futlord",
      email: adminEmail,
      password: hashedPassword,
      role: ROLES.ADMIN,
    });

    console.log("Admin user created successfully");
    process.exit();
  } catch (error) {
    console.error("Admin seed failed");
    process.exit(1);
  }
};


createAdmin();
