import { api } from './api';
import { Booking } from '@/types/booking';


export const getBookedDates = async () => {
  const res = await api.get('api/bookings/dates');
  return res.data.dates; // ISO strings
};

export const createOneTimeBooking = async (data: {
  package: string;
  sessionDate: string;
  notes?: string;
}) => {
  const res = await api.post("/api/bookings", {
    ...data,
    bookingType: "one-time",
  });

  return res.data.booking;
};

/**
 * SUBSCRIPTION BOOKING
 */
export const createSubscriptionBooking = async (packageId: string) => {
  const res = await api.post("/api/bookings", {
    package: packageId,
    bookingType: "subscription",
  });

  return res.data.booking;
};



export const fetchMyBookings = async (): Promise<Booking[]> => {
  const res = await api.get('/api/bookings/me');
  return res.data.bookings;
};

export const cancelBooking = async (bookingId: string): Promise<void> => {
  await api.patch(`/api/bookings/${bookingId}/cancel`);
};

export const fetchBookingById = async (id: string): Promise<Booking> => {
  const res = await api.get(`/api/bookings/${id}`);
  return res.data.booking;
};

export const fetchAllBookings = async (): Promise<Booking[]> => {
  const res = await api.get('/api/bookings');
  return res.data.bookings;
};

export const deleteBooking = async (id: string) => {
  await api.delete(`/api/bookings/${id}`)
}

export const updateBookingStatus = async (id: string, status: string) => {
  const res = await api.put(`/api/bookings/status/${id}`, { status });
  return res.data.booking;
};
