import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    
    try {
      setError("");
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"   // tells Express to parse JSON
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!res.ok) {
         setError("Invalid credentials");
        return;
      }

      const {user: userData, token} = await res.json();

      
      
      login(userData, token);
      
      navigate("/dashboard");

    }catch {
      setError("Server is not reachable");
    }


};



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded" onClick={handleSubmit}>
          Login
        </button>

        {error && <p className="text-center text-sm text-red-600 mt-4">
                  {error}
                  </p>
        }

      </div>
    </div>
  );
}
