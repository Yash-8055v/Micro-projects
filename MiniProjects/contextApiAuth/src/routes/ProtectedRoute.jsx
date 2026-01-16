
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;  //! replace = “Don’t keep this page in browser history.” means if user press prev <- it will go to page before protected if replace not used user will go to protected page and again redirect to / so it will go loop
  }

  return children;
}
