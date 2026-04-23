import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await login(form.username, form.password)
      navigate('/')
    } catch {
      setErro('Usuário ou senha inválidos.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a2a4a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '380px', padding: '0 16px' }}>

        {/* Logo */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '60px', fontWeight: 750, color: '#d4a017', letterSpacing: '-0.5px' }}>C2P</div>
          <div style={{ fontSize: '20px', color: '#fdfdfd', marginTop: '15px' }}>Faça login para continuar</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #ebebea', borderRadius: '12px', padding: '24px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '20px', color: '#888780', fontWeight: 500, marginBottom: '5px' }}>Usuário</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="admin"
                required
                style={{ width: '100%', background: '#fafaf8', border: '1px solid #ebebea', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1c1c1a', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '20px', color: '#888780', fontWeight: 500, marginBottom: '5px' }}>Senha</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                style={{ width: '100%', background: '#fafaf8', border: '1px solid #ebebea', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1c1c1a', outline: 'none' }}
              />
            </div>

            {erro && (
              <div style={{ background: '#fcebeb', border: '1px solid #f09595', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', color: '#a32d2d' }}>
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              style={{ padding: '9px', background: '#1c1c1a', color: '#f0efe8', border: 'none', borderRadius: '7px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', opacity: carregando ? 0.7 : 1, marginTop: '4px' }}
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#b4b2a9' }}>
          admin / admin123
        </div>
      </div>
    </div>
  )
}