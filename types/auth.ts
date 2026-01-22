export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | "ADMIN";
  image?: string | null;
}
