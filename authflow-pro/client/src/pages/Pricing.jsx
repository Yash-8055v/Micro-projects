import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export default function Pricing() {
  const { user } = useAuth();

  const handleUpgrade = async () => {
    try {
      // Call backend to create Stripe checkout session
      const res = await api.post("/payments/create-checkout-session");

      // Redirect user to Stripe hosted checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to start payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ================= FREE PLAN ================= */}
        <div className="bg-white rounded-xl shadow p-6 border">
          <h2 className="text-xl font-bold mb-2">Free Plan</h2>
          <p className="text-gray-600 mb-4">
            Ideal for getting started
          </p>

          <ul className="text-sm text-gray-600 space-y-2 mb-6">
            <li>✔ Email & Google Login</li>
            <li>✔ User Dashboard</li>
            <li>✔ Role-based access</li>
            <li>✖ Premium features</li>
          </ul>

          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-2 rounded cursor-not-allowed"
          >
            Current Plan
          </button>
        </div>

        {/* ================= PRO PLAN ================= */}
        <div className="bg-white rounded-xl shadow p-6 border border-indigo-600">
          <h2 className="text-xl font-bold mb-2">Pro Plan</h2>
          <p className="text-gray-600 mb-4">
            Best for power users
          </p>

          <ul className="text-sm text-gray-600 space-y-2 mb-6">
            <li>✔ Everything in Free</li>
            <li>✔ Admin features</li>
            <li>✔ Payments enabled</li>
            <li>✔ Future SaaS features</li>
          </ul>

          {user?.isPro ? (
            <button
              disabled
              className="w-full bg-green-600 text-white py-2 rounded cursor-default"
            >
              Pro Active ✅
            </button>
          ) : (
            <button
              onClick={handleUpgrade}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Upgrade to Pro ₹499
            </button>
          )}
        </div>

      </div>
    </div>
  );
}