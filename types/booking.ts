export interface Booking {
  _id: string;
  sessionDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  package: {
    name: string;
    price: number;
    coverImage: string;
  };
}
