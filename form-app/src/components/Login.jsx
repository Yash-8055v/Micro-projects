import React, { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: ""
  });

  const [loading, setLoading] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 2000);
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      if (email.trim() === "" || password.trim() === "") {
        showToast("Fill all fields", "error");
      } else if (!email.includes("@")) {
        showToast("Email must contain @", "error");
      } else if (password.length < 6) {
        showToast("Password must be at least 6 characters", "error");
      } else {
        // localStorage.setItem("email", email);
        // localStorage.setItem("password", password)
        showToast("Login successful!", "success");
        setEmail("");
        setPassword("");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* TOAST */}
      {toast.message && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <form onSubmit={handelSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Enter email"
            className={`w-full p-2 border rounded mb-2 ${loading ? "bg-gray-100 cursor-not-allowed" : ""} focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={`w-full p-2 border rounded mb-2 ${loading ? "bg-gray-100 cursor-not-allowed" : ""} focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded mt-3 text-white 
            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
