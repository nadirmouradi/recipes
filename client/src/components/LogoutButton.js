import { useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
    <FiLogOut />

      Déconnexion
    </button>
  )
}

export default LogoutButton
