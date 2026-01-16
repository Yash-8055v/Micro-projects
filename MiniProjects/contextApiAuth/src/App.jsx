import './App.css'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import {Route, Routes} from "react-router-dom"
import ProtectedRoute from './routes/ProtectedRoute'

function App() {

  return (
    <Routes>

      <Route path="/" element={<Login />} />
      
      <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
    </Routes>

  )
}

export default App
