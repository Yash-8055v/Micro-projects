import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export default function OAuthCallback() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      try {
        const res = await api.get("/auth/me");
        login(res.data.user);

        // role-based redirect
        if (res.data.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/user", { replace: true });
        }
      } catch (err) {
        navigate("/login", { replace: true });
      }
    };

    finishLogin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Signing you in with Google…</p>
    </div>
  );
}
