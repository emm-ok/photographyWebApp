import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import User from "../modules/users/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

    // const user = await User.findById(decoded.userId);

    // if(!user) return res.status(401).json({ message: "Unauthorized" });
    
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error: error.message});
  }
};
