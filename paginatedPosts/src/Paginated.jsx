import { useEffect, useState } from "react";

export default function Paginated() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=5`)
    .then((res) => res.json())
    .then((data) => {
      setPosts(data);
      setLoading(false);
      
    })
    .catch(() => {
      setLoading(false);
      setError("failed to fetch posts");
    })
  }, [currentPage])

  const changeCurrentPage = (e) => {
    const currentPage = e.target.value;
    setCurrentPage(Number(currentPage)); //! value from html element is always String so here convert it to number
  }


  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">

        <h2 className="text-xl font-bold mb-4 text-center">
          Posts
        </h2>

        {/* Posts */}
        <div className="space-y-2">
          {!loading && !error && (
            posts.map((post) => (
              <div className="p-2 bg-gray-100 rounded" key={post.id}>
                {post.title}
              </div>
            )))
          }
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button className={`px-3 py-1 ${currentPage === 1 ? "bg-blue-500 text-white": "bg-gray-200"} rounded`}
            
            onClick={changeCurrentPage}  value={1}>
            1
          </button>
          <button className={`px-3 py-1 ${currentPage === 2 ? "bg-blue-500 text-white": "bg-gray-200"} rounded`} onClick={changeCurrentPage} value={2}>
            2
          </button>
          <button className={`px-3 py-1 ${currentPage === 3 ? "bg-blue-500 text-white": "bg-gray-200"} rounded`} onClick={changeCurrentPage} value={3}>
            3
          </button>
          <button className={`px-3 py-1 ${currentPage === 4 ? "bg-blue-500 text-white": "bg-gray-200"} rounded`} onClick={changeCurrentPage} value={4}>
            4
          </button>
        </div>

        {/* Loading */}
        <div className="text-center text-gray-500 mb-2">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
        </div>

      </div>
    </div>
  );
}
