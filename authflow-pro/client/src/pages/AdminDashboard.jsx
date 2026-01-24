import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.users);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
  try {
    await api.patch(`/admin/users/${userId}/role`, {
      role: newRole,
    });

    // Update UI instantly
    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId ? { ...u, role: newRole } : u
      )
    );
  } catch (error) {
    alert("Failed to update role");
  }
};

const handleDeleteUser = async (userId) => {
  const confirm = window.confirm("Are you sure you want to delete this user?");
  if (!confirm) return;

  try {
    await api.delete(`/admin/users/${userId}`);

    // Remove from UI
    setUsers((prev) => prev.filter((u) => u._id !== userId));
  } catch (error) {
    alert("Failed to delete user");
  }
};



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Logged in as <strong>{user?.email}</strong>
        </p>

        {loading && <p className="text-gray-500">Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              <p className="text-sm text-gray-500 pb-2">
  Manage users, roles, and permissions
</p>

  <table className="w-full table-fixed border border-gray-200 rounded-lg overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-4 text-left w-[40%]">Email</th>
        <th className="p-4 text-left w-[20%]">Role</th>
        <th className="p-4 text-left w-[20%]">Created</th>
        <th className="p-4 text-center w-[20%]">Actions</th>
      </tr>
    </thead>

    <tbody>
      {users.map((u) => (
        <tr
          key={u._id}
          className="border-t hover:bg-gray-50 transition"
        >
          {/* Email */}
          <td className="p-4 truncate">{u.email}</td>

          {/* Role badge */}
          <td className="p-4">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
                ${
                  u.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
            >
              {u.role.toUpperCase()}
            </span>
          </td>

          {/* Created date */}
          <td className="p-4 text-gray-600">
            {new Date(u.createdAt).toLocaleDateString()}
          </td>

          {/* Actions */}
          <td className="p-4">
            <div className="flex justify-center gap-3">
              {u.role === "user" ? (
                <button
                  onClick={() => handleRoleChange(u._id, "admin")}
                  className="px-3 py-1 text-sm rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
                >
                  Promote
                </button>
              ) : (
                <button
                  onClick={() => handleRoleChange(u._id, "user")}
                  className="px-3 py-1 text-sm rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                >
                  Demote
                </button>
              )}

              <button
                className="px-3 py-1 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>
        )}

      </div>
    </div>
  );
}
