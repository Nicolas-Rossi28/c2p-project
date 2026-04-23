const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO'
]

const selectStyle = {
  background: '#fafaf8',
  border: '1px solid #ebebea',
  borderRadius: '6px',
  padding: '0 28px 0 8px',
  fontSize: '12px',
  color: '#5f5e5a',
  outline: 'none',
  height: '28px',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23b4b2a9' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 7px center',
  cursor: 'pointer',
}

export default function Filtros({ filtros, onChange, onNovo }) {
  return (
    <div style={{ display: 'flex', gap: '8px', padding: '10px 14px', borderBottom: '1px solid #ebebea', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Buscar por nome, email ou cidade..."
        value={filtros.search}
        onChange={(e) => onChange({ ...filtros, search: e.target.value, page: 1 })}
        style={{
          background: '#fafaf8', border: '1px solid #ebebea', borderRadius: '6px',
          padding: '5px 10px', fontSize: '12px', color: '#1c1c1a',
          flex: 1, outline: 'none', height: '28px',
        }}
      />

      <select
        value={filtros.estado}
        onChange={(e) => onChange({ ...filtros, estado: e.target.value, page: 1 })}
        style={selectStyle}
      >
        <option value="">Todos os estados</option>
        {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
      </select>

      <select
        value={filtros.ativo}
        onChange={(e) => onChange({ ...filtros, ativo: e.target.value, page: 1 })}
        style={selectStyle}
      >
        <option value="">Todos os status</option>
        <option value="true">Ativos</option>
        <option value="false">Inativos</option>
      </select>

      <button
        onClick={onNovo}
        style={{
          background: '#1a3a2a', color: '#7bc4a0',
          border: '1px solid #2a5a40', padding: '0 12px',
          borderRadius: '7px', fontSize: '12px', fontWeight: 500,
          cursor: 'pointer', height: '28px', whiteSpace: 'nowrap',
        }}
      >
        + Novo Cliente
      </button>
    </div>
  )
}