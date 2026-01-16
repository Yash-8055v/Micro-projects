import { useAuth } from "./context/AuthContext";

export default function Profile() {
  const { user, token } = useAuth();

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">Profile</h2>
      <pre>{JSON.stringify({ user, token }, null, 2)}</pre>
    </div>
  );
}
