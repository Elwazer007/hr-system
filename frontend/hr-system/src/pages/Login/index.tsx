import { useState } from "react";
import styles from "./styles.module.css";
import { login } from "../../api/auth";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate()

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      navigate('/employees')
    } catch (error) {
        console.error(error);
        setError("Login Failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.continer}>
        <h2 className={styles.loginHeader}>HR account sign in</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
