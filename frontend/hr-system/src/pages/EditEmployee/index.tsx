import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editEmployee, fetchEmployee } from "../../api/employees";
import { Employee } from "../../types/employees";

import styles from "./styles.module.css";

const EditEmployee = () => {
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
    userType: "NE",
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await fetchEmployee(id);
        setEmployee(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editEmployee(id, employee);
      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>EditEmployee</h2>
      <form className={styles.editUserForm} onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Edit Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
