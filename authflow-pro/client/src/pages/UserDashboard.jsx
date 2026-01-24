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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow p-6 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">
            Welcome back 👋
          </p>
        </div>

        {/* User Info */}
        <div className="border rounded-lg p-4 space-y-2">
          <p className="text-sm">
            <span className="font-medium">Email:</span>{" "}
            {user?.email}
          </p>

          <p className="text-sm">
            <span className="font-medium">Role:</span>{" "}
            <span className="capitalize">{user?.role}</span>
          </p>

          <p className="text-sm">
            <span className="font-medium">Plan:</span>{" "}
            <span className="text-yellow-600">Free</span>
          </p>
        </div>

        {/* Upgrade CTA */}
        <button
          onClick={() => navigate("/pricing")}
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
        >
          Upgrade Plan
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
