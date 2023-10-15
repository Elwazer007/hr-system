import { ChangeEvent, useEffect, useState } from "react";
import DateSelector from "./DateSelector";
import { Employee } from "../../types/employees";
import { addAttendance, fetchEmployees } from "../../api/employees";
import styles from "./styles.module.css";

const Attendance: React.FC = () => {
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const [date, setDate] = useState<string>(minDate);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleEmployeeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployee(Number(event.target.value));
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAttendance(selectedEmployee, date);
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Attendance</h1>

      <form className={styles.attendanceForm} onSubmit={handleSubmit}>
        <DateSelector date={date} setDate={setDate} />

        <select
          required
          value={selectedEmployee || ""}
          onChange={handleEmployeeChange}
        >
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>

        <button type="submit">Save Attendance</button>
      </form>
    </div>
  );
};

export default Attendance;
