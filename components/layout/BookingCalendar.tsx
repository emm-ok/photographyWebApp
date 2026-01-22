import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { getBookedDates } from '@/lib/bookings';

export default function BookingCalendar({
  onSelect,
}: {
  onSelect: (date: Date) => void;
}) {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  // useEffect(() => {
  //   getBookedDates().then(dates =>
  //     setBookedDates(dates.map((d: string) => new Date(d)))
  //   );
  // }, []);

  const isDisabled = (date: Date) => {
    return (
      date < new Date() ||
      bookedDates.some(
        booked =>
          booked.toDateString() === date.toDateString()
      )
    );
  };

  return (
    <Calendar
      tileDisabled={({ date }) => isDisabled(date)}
      onClickDay={onSelect}
    />
  );
}
