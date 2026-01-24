import { User } from "@/types/auth";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface AdminUserRowProps {
  user: User;
}

export default function AdminUserRow({ user }: AdminUserRowProps) {
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <tr className="hover:bg-surface-hover transition-colors">
      {/* USER */}
      <td className="p-3 md:p-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="
              w-8 h-8 md:w-10 md:h-10
              rounded-full
              bg-on-surface/10
              text-on-surface
              flex items-center justify-center
              font-semibold text-xs md:text-sm
            "
          >
            {user?.image ? (
              <Image
                src={user.image}
                alt="User avatar"
                width={40}
                height={40}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="leading-tight">
            <div className="font-medium text-sm md:text-base text-on-surface">
              {user.name}
            </div>
            <div className="text-[11px] md:text-xs text-muted">
              {user.email}
            </div>
          </div>
        </div>
      </td>

      {/* ROLE */}
      <td>
        <span
          className={`
            px-2 py-0.5 md:px-3 md:py-1
            rounded-full
            text-[10px] md:text-xs font-medium
            ${user.role === "admin" ? "bg-primary text-on-primary" : "bg-surface-variant text-on-surface-variant"}
          `}
        >
          {user.role}
        </span>
      </td>

      {/* AUTH */}
      <td>
        <span className="text-[10px] md:text-xs text-muted">
          {user.googleId ? "Google" : "Email"}
        </span>
      </td>

      {/* STATUS */}
      <td>
        <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs bg-success/20 text-success">
          Active
        </span>
      </td>

      {/* JOINED */}
      <td className="text-[10px] md:text-xs text-muted">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      {/* ACTION */}
      <td className="pr-2 md:pr-4 text-right">
        <button className="p-1.5 md:p-2 rounded-lg hover:bg-surface-hover transition">
          <MoreHorizontal size={14} className="text-on-surface/70" />
        </button>
      </td>
    </tr>
  );
}
