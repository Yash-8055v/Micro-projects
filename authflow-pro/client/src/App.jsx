import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import DashboardRedirect from "./pages/DashboardRedirect";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route 
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRedirect/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["user"]}>
              <UserDashboard/>
            </RoleProtectedRoute>
            
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard/>
            </RoleProtectedRoute>
            
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized/>}/>
    </Routes>
  );
}

export default App;
