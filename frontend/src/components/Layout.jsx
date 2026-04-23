import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { logout } = useAuth()

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'var(--font-sans)' }}>

      {/* Sidebar */}
      <aside style={{
        width: '250px',
        minWidth: '200px',     // impede encolher
        maxWidth: '250px', 
        background: '#1c1c1a',
        borderRight: '1px solid #2a2a28',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden', 
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 18px 10px', borderBottom: '1px solid #2a2a28', background: '#1a2a4a' }}>
          <div style={{ fontSize: '50px', fontWeight: 750, color: '#d4a017', letterSpacing: '-0.5px', lineHeight: 1 }}>
            C2P
          </div>
          <div style={{ fontSize: '18px', color: '#b6b6b6', marginTop: '4px' }}>
            Gestão de Clientes
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 650, color: '#b6b6b6', textTransform: 'uppercase', letterSpacing: '0.8px', padding: '0 8px', marginBottom: '6px' }}>
            Menu
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            padding: '8px 10px', borderRadius: '7px',
            fontSize: '16px', color: '#f0efe8',
            background: '#2a2a28',
          }}>
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="#f0efe8"/>
              <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" fill="#f0efe8"/>
              <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" fill="#f0efe8"/>
              <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" fill="#f0efe8"/>
            </svg>
            Dashboard
          </div>
        </nav>

        {/* Footer */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid #2a2a28' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%',
              background: '#2a2a28', border: '1px solid #3a3a37',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 600, color: '#b4b2a9',
            }}>
              AD
            </div>
            <div>
              <div style={{ fontSize: '18px', color: '#d3d1c7', fontWeight: 500 }}>Admin</div>
              <div style={{ fontSize: '12px', color: '#b6b6b6' }}>Administrador</div>
            </div>
            <button
              onClick={logout}
              style={{
                marginLeft: 'auto', fontSize: '16px', color: '#FFF',
                background: '#7f1d1d', border: 'none', cursor: 'pointer',
                padding: '8px 12px', borderRadius: '10px',
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main style={{ flex: 1, background: '#fafaf8', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </main>
    </div>
  )
}