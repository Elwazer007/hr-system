import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { fetchEmployees } from "../../api/employees";
import { Employee } from "../../types/employees";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const navigate = useNavigate();

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

  const handleRedirectToCreateEmpoyee = () => {
    navigate("/create");
  };

  const handleEditEmployee = (id: number | undefined) => {
    if (!id) return;
    navigate(`/employees/${id}`);
  };

  const handleAddAttendance = () => {
    navigate(`/attendance`);
  } 



  return (
    <div className={styles.employeesList}>
      <div className={styles.buttons}>
        <button
          onClick={handleRedirectToCreateEmpoyee}
          className={styles.button}
        >
          Add Employee
        </button>
        <button
          onClick={handleAddAttendance}
          className={styles.button}
        >
          Add Attendance
        </button>
      </div>
      <h1>Employee List</h1>
      <div className={styles.list}>
        {employees.map((employee: Employee) => (
          <div
            title="Edit"
            className={styles.employee}
            key={employee.id}
            onClick={() => handleEditEmployee(employee.id)}
          >
            <p>
              {employee.firstName} {employee.lastName}
            </p>
            <p>{employee.userType}</p>

            <p>{employee.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
