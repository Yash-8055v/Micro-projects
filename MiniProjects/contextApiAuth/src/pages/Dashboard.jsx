import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const {user, logout} = useAuth();
  console.log(user)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">

        <h2 className="text-2xl font-bold mb-4">
          Dashboard
        </h2>

        <p className="mb-6">
          Welcome, {user.email}
        </p>

        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => 
        {
          
          logout()

        }}>
          Logout
        </button>

      </div>
    </div>
  );
}
