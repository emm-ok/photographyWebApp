import { api } from "./api";
import { Package, PackagePayload } from "@/types/package";
import { ApiResponse } from "@/types/api";



// PUBLIC
export const getPublicPackages = async (): Promise<Package[]> => {
  const res = await api.get("/api/packages");
  return res.data.packages;
};

// ADMIN
export const createPackage = async (payload: PackagePayload): Promise<Package> => {
  const res = await api.post("/api/packages", payload);
  return res.data.package;
};


export const deletePackage = async (
  id: string
): Promise<ApiResponse<null>> => {
  const res = await api.delete(`/api/packages/${id}`);
  return { message: res.data.message, data: null };
};

export const getAdminPackages = async () => {
  const res = await api.get("/api/packages/admin");
  return res.data.packages;
};
export const reorderPackages = async (
  payload: { id: string; order: number }[]
) => {
  await api.post("/api/packages/reorder", payload);
};

export const archivePackage = async(id: string) => {
  await api.patch(`/api/packages/${id}/archive`);
}

export const togglePackageVisibility = async(id: string) => {
  await api.patch(`/api/packages/${id}/visibility`);
}
  
export const updatePackage = async (id: string, payload: PackagePayload): Promise<Package> => {
  const res = await api.put(`/api/packages/${id}`, payload);
  return res.data.package;
};