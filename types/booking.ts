import {  Package } from "./package";

export interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  }
  sessionDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  package: Package;
  notes?: string;
}
