export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        <p className="text-gray-600 mb-6">
          You are logged in (protected route)
        </p>

        <button className="w-full bg-red-500 text-white p-3 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
