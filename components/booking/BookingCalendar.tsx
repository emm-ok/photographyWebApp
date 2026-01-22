import { isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function BookingCalendar({
  bookedDates,
  selected,
  onSelect,
}: {
  bookedDates: Date[];
  selected: Date | undefined;
  onSelect: (date?: Date) => void;
}) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      disabled={(date) =>
        bookedDates.some((d) => isSameDay(d, date))
      }
    />
  );
}
