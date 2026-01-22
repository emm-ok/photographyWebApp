export type PackageType = "one-time" | "subscription";
export type UsageRights = "personal" | "commercial";

export interface PackagePayload {
  name: string;
  price: number;
  duration: number;
  delivery: number;
  imageCount: number;
  description: string;
  isActive: boolean;
  type: PackageType;
  coverImage?: string;
}

export interface Package extends PackagePayload {
  _id: string;
  featured: string[];
  deliveryTime: string;
  usageRights: UsageRights;
  createdAt: string;
  updatedAt: string;
}
