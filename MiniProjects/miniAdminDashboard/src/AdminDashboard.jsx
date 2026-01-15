import { useEffect, useState } from "react"

export default function AdminDashboard() {
  
  const [users, setUsers] = useState([]);
  // const [filteredUsers, setFilteredUsers] = useState([])
  const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true);
    setError("")
    fetch(`https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=3&name_like=${searchText}`)
    .then(res => res.json())
    .then((data) => {
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      setError("failed to fetch users");
    })
  }, [currentPage, searchText])

  const handelSearch = async (e) => {

    const text = e.target.value;
    await setSearchText(text);
    // console.log(text)
    // const selectedUsers = users.filter((user) => (
    //   user.name.toLowerCase().includes(text.toLowerCase())
    // ))
    // setFilteredUsers(selectedUsers);

  }

  const changeCurrentPage = (e) => {
    setSearchText("")
    const CurrentPage = e.target.value;
    setCurrentPage(Number(CurrentPage));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-2xl font-bold mb-6 text-center">
        Admin Dashboard
      </h1>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchText}
          onChange={handelSearch}
        />
      </div>

      {/* Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>

          <tbody>
            {
                filteredUsers.map((user) => (
                  <tr className="border-t" key={user.id}>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        <button className={`px-3 py-1 ${currentPage === 1 ? "bg-blue-500 text-white": "bg-gray-200"} rounded`} value={1} onClick={changeCurrentPage}>
          1
        </button>
        <button className={`px-3 py-1 ${currentPage === 2 ? "bg-blue-500 text-white": "bg-gray-200"} rounded`} value={2} onClick={changeCurrentPage}>
          2
        </button>
        <button className={`px-3 py-1 ${currentPage === 3 ? "bg-blue-500 text-white": "bg-gray-200"} rounded`} value={3} onClick={changeCurrentPage}>
          3
        </button>
      </div>

      {/* Loading */}
      <div className="text-center text-gray-500 mt-4">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>

    </div>
  );
}
