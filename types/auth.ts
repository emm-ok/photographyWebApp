export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'client' | "admin";
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  googleId?: string;
}


export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}