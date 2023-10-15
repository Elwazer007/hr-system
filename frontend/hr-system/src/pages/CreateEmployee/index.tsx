import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.css";
import { Employee } from "../../types/employees";
import { addEmployee } from "../../api/employees";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
    userType: "NE",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addEmployee(employee);
  };

  return (
    <div className={styles.createContainer}>
      <h1>Create Employee</h1>
      <form className={styles.createEmployeeForm} onSubmit={handleSubmit}>
        <label>
          First Name:
          <input required type="text" name="firstName" onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input required type="text" name="lastName" onChange={handleChange} />
        </label>
        <label>
          Email:
          <input required type="email" name="email" onChange={handleChange} />
        </label>
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
