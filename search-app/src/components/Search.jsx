import React, { useEffect } from 'react'
import { useState } from 'react'

function Search() {
  
  const Users = [
    "John",
    "Riya",
    "Amit",
    "Sneha",
    "Rahul",
    "Neha",
    "Arjun",
    "Priya"
  ];

  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState(Users);


  useEffect(() => {
  const filtered = Users.filter((user) =>
    user.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  setFilteredList(filtered);
  }, [searchText]);


  const handelInpTxt = (e) => (setSearchText(e.target.value) )


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">

        <input type="text" placeholder='Search Users...' value={searchText} onChange={handelInpTxt} className='w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
        
        <ul className="space-y-2">
          {
            filteredList?.map((user) => (
              <li key={user} className="p-2 bg-gray-100 rounded">{user}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Search