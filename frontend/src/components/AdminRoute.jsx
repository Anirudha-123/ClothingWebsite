import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { role } = useSelector((state) => state.auth);

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;