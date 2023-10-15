import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.header}>
      <h1 onClick={handleRedirectToHome}>HR System</h1>
    </div>
  );
};

export default Header;
