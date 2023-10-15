import { ChangeEvent } from "react";

interface DateSelectorProps {
  date: string;
  setDate: (date: string) => void;
}

const DateSelector = ({ date, setDate }: DateSelectorProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  return (
    <div>
      <input type="date" value={date} onChange={handleChange} min={minDate} />
    </div>
  );
};

export default DateSelector;
