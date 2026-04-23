import { useState } from 'react'

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO'
]

const FORM_INICIAL = { nome: '', email: '', telefone: '', cidade: '', estado: '', ativo: true }

const inputStyle = (erro) => ({
  width: '100%', background: '#fafaf8',
  border: `1px solid ${erro ? '#f09595' : '#ebebea'}`,
  borderRadius: '6px', padding: '7px 10px',
  fontSize: '13px', color: '#1c1c1a', outline: 'none',
})

export default function ModalCliente({ cliente, onSalvar, onFechar, salvando }) {
  const [form, setForm] = useState(cliente ?? FORM_INICIAL)
  const [erros, setErros] = useState({})

  const validar = () => {
    const e = {}
    if (!form.nome.trim()) e.nome = 'Obrigatório'
    if (!form.email.trim()) e.email = 'Obrigatório'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.telefone.trim()) e.telefone = 'Obrigatório'
    if (!form.estado) e.estado = 'Obrigatório'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errosVal = validar()
    if (Object.keys(errosVal).length > 0) { setErros(errosVal); return }
    onSalvar(form)
  }

  const campo = (label, name, tipo = 'text') => (
    <div>
      <label style={{ display: 'block', fontSize: '12px', color: '#888780', marginBottom: '5px', fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={tipo}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        style={inputStyle(erros[name])}
      />
      {erros[name] && <p style={{ fontSize: '11px', color: '#a32d2d', marginTop: '3px' }}>{erros[name]}</p>}
    </div>
  )

  return (
    <div
      onClick={onFechar}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '480px', border: '1px solid #ebebea' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #ebebea' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1c1c1a' }}>
              {cliente?.id ? 'Editar Cliente' : 'Novo Cliente'}
            </div>
            <div style={{ fontSize: '12px', color: '#888780', marginTop: '1px' }}>
              {cliente?.id ? 'Atualize os dados do cliente' : 'Preencha os dados do novo cliente'}
            </div>
          </div>
          <button onClick={onFechar} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#b4b2a9', lineHeight: 1 }}>×</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {campo('Nome completo', 'nome')}
            {campo('Telefone', 'telefone', 'tel')}
          </div>
          {campo('Email', 'email', 'email')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {campo('Cidade', 'cidade')}
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#888780', marginBottom: '5px', fontWeight: 500 }}>Estado</label>
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
                style={{ ...inputStyle(erros.estado), appearance: 'none' }}
              >
                <option value="">Selecione...</option>
                {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
              </select>
              {erros.estado && <p style={{ fontSize: '11px', color: '#a32d2d', marginTop: '3px' }}>{erros.estado}</p>}
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.ativo}
              onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
              style={{ accentColor: '#1a3a2a', width: '14px', height: '14px' }}
            />
            <span style={{ fontSize: '13px', color: '#444441' }}>Cliente ativo</span>
          </label>

          <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
            <button type="button" onClick={onFechar} style={{ flex: 1, padding: '8px', border: '1px solid #ebebea', borderRadius: '7px', fontSize: '13px', color: '#5f5e5a', background: '#fafaf8', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button type="submit" disabled={salvando} style={{ flex: 1, padding: '8px', border: '1px solid #2a5a40', borderRadius: '7px', fontSize: '13px', fontWeight: 500, color: '#7bc4a0', background: '#1a3a2a', cursor: 'pointer', opacity: salvando ? 0.6 : 1 }}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}