import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async () => {
  try {
    setError("");
    setLoading(true);

    await api.post("/auth/login", {
      email,
      password,
    });

    
    
    // SUCCESS
    await login();
    navigate("/dashboard", { replace: true });


  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
    setEmail("");
    setPassword("")
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          onClick={handleSubmit}
          disabled={loading}
          
        >
           {loading ? "Logging in..." : "Login"}
        </button>
          <p className="text-center mb-2 mt-2">OR</p>
        <button
          className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded hover:bg-gray-100 transition mb-4"
          onClick={() => {
            window.location.href = "http://localhost:3000/api/auth/google";
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">
            Continue with Google
          </span>
        </button>

        {/* Footer */}
        

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>

        

        {error && (
          <p className="text-center text-sm text-red-600 mt-4">
            {error}
          </p>
        )}

      </div>
    </div>
  );
}
