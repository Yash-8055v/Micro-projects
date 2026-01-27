import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function PaymentSuccess() {
  const navigate = useNavigate();
  

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow p-8 max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-600">
          🎉 Payment Successful!
        </h1>

        <p className="text-gray-600">
          Your account has been upgraded to <strong>Pro</strong>.
        </p>

        <p className="text-sm text-gray-500">
          Redirecting to dashboard...
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
