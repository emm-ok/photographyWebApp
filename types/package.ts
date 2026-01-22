export interface Package {
  _id: string;
  name: string;
  price: number; // USD
  duration: string; // e.g. "2 hours"
  description: string;
  features: string[];
  deliveryTime: string; // e.g. "48 hours"
  usageRights: "personal" | "commercial";
  isPopular: boolean;
  isActive: boolean;
  isArchived: boolean;
  previewImages?: string[];
  bookingsCount?: number; // admin analytics
  order: number;
}