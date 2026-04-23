import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">C2P Sistema</h1>
            <p className="text-xs text-gray-500">Gestão de Clientes</p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* Conteúdo da página */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}