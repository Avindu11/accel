import { useAuth } from "./AuthContext";
import { Navigate } from "react-router";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user?.admin?.status !== 1) return <Navigate to="/forbidden" />;

  return children;
}

export default AdminRoute;
