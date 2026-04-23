import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Envolve qualquer rota que exige login
// Se não estiver autenticado, redireciona para /login
export default function RotaProtegida({ children }) {
  const { usuario, carregando } = useAuth()

  // Enquanto verifica o localStorage, não renderiza nada
  // Evita flash de redirecionamento indevido
  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return children
}