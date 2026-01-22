import { ApiResponse } from "@/types/getApi";
import { api } from "./api"

export const getAllUsers = async (): Promise<ApiResponse<null>> => {
  const res = await api.get('/api/users');
  return { users: res.data.filteredUsers, count: res.data.count };
};


export const getCurrentUser = async() => {
  const res = await api.get('/api/users/me');
  return res.data
}

export const updateUserById = async (
  id: string,
  data: {
    name: string,
    phone?: string,
    location?: string,
    bio?: string,
    image?: string,
  }
) => {
  const res = await api.patch(`/api/users/${id}`, data);
  return res.data
}

