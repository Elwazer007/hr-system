import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import EmployeeList from "./pages/EmpoyeeList";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import Attendance from "./pages/Attendance";

interface AuthenticatedRouteProps {
  children: JSX.Element;
}

export const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
  const location = useLocation();

  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/employees"
            element={
              <AuthenticatedRoute>
                <EmployeeList />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <AuthenticatedRoute>
                <Attendance />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <AuthenticatedRoute>
                <CreateEmployee />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <AuthenticatedRoute>
                <EditEmployee />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
