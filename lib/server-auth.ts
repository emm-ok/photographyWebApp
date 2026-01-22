import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { env } from "@/config/env"; // or process.env

export interface ServerUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CLIENT";
}

export async function getServerUser(): Promise<ServerUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as ServerUser;

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}
