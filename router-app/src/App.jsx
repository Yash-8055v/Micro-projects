import { Link, Outlet } from 'react-router-dom'
import './App.css'
import {Home, About, Contact} from "./pages/index.js"



function App() {

  
  
  return (
    <>
      <div className="bg-blue-600 text-white p-4 flex gap-6 justify-center">
        <Link className="hover:underline" to="/home">Home</Link>
        <Link className="hover:underline" to="/about">About</Link>
        <Link className="hover:underline" to="/contact">Contact</Link>
      </div>

      <div className="p-6 text-center">
        <Outlet />
      </div>
    </>
    
  )
}

export {App}
