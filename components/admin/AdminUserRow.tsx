import { MoreHorizontal } from "lucide-react";

export default function AdminUserRow({ user }) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-4">
        <div className="font-medium">{user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            user.role === "admin" ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          {user.role}
        </span>
      </td>

      <td>
        <span className="text-xs">{user.googleId ? "Google" : "Email"}</span>
      </td>

      <td>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Active
        </span>
      </td>
      <td className="text-xs text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td className="pr-4 text-right">
        <button className="p-2 rounded hover:bg-gray-100">
          <MoreHorizontal size={16} />
        </button>
      </td>
    </tr>
  );
}
