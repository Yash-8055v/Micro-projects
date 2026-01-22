export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-xl font-bold mb-2">403 Unauthorized</h1>
        <p className="text-gray-600">
          You don’t have permission to access this page.
        </p>
      </div>
    </div>
  );
}
