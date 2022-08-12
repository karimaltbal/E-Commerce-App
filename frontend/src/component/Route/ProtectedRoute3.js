import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
    const { loading, isAuthenticated } = useSelector((state) => state.auth);
    let location = useLocation();

  if (isAuthenticated === false) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
