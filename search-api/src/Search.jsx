import { useEffect, useState } from "react";


export default function Search() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then((users) => {
      setUsers(users);
      setFilteredUsers(users);
      setLoading(false);
      
      

    })
    .catch((err) => {
      setLoading(false);
      setError("Failed to load users");
  })
  }, [])

  const filterUsers = (e) => {
    const value = e.target.value;    // 🔴 don’t rely on async state
    setSearchText(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())   
    );
          
    setFilteredUsers(filtered);
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Search Users
        </h2>

        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchText}
          onChange={filterUsers}
        />

        <div className="text-center text-gray-500 mb-2">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
        </div>

         {!loading && !error && (
          <ul className="space-y-2">
            {filteredUsers.map((user) => (
              <li
                key={user.id}       // 🔴 key must be a stable primitive
                className="p-2 bg-gray-100 rounded"
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}
