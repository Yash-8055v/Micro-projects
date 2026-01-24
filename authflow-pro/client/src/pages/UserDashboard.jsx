import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Welcome back 👋
        </p>

        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm text-gray-500">Account Info</p>

          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span>Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>

            <div className="flex justify-between">
              <span>Role</span>
              <span className="font-medium capitalize">{user?.role}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
