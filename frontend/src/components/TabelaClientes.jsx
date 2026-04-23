export default function TabelaClientes({ clientes, carregando, onEditar, onExcluir, paginacao, onPagina }) {
  if (carregando) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '24px', height: '24px', border: '2px solid #ebebea', borderTopColor: '#888780', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (clientes.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '13px', color: '#888780' }}>Nenhum cliente encontrado.</p>
      </div>
    )
  }

  const th = { fontSize: '11px', color: '#888780', textAlign: 'left', padding: '9px 14px', borderBottom: '1px solid #ebebea', fontWeight: 500 }
  const td = { fontSize: '12px', color: '#5f5e5a', padding: '10px 14px', borderBottom: '1px solid #f5f5f3' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Nome', 'Email', 'Cidade / Estado', 'Status', 'Ações'].map((col) => (
                <th key={col} style={th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} style={{ cursor: 'default' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fafaf8'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ ...td, color: '#1c1c1a', fontWeight: 500 }}>{c.nome}</td>
                <td style={{ ...td, color: '#888780' }}>{c.email}</td>
                <td style={td}>{c.cidade}, {c.estado}</td>
                <td style={td}>
                  <span style={{
                    display: 'inline-flex', padding: '2px 8px', borderRadius: '4px',
                    fontSize: '11px', fontWeight: 500,
                    background: c.ativo ? '#eaf3de' : '#fcebeb',
                    color: c.ativo ? '#3b6d11' : '#a32d2d',
                  }}>
                    {c.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => onEditar(c)} style={{ fontSize: '11px', color: '#444441', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      Editar
                    </button>
                    <button onClick={() => onExcluir(c)} style={{ fontSize: '11px', color: '#af1616', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rodapé paginação */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #ebebea', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', color: '#888780' }}>
          {paginacao.count} clientes
        </span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            onClick={() => onPagina(paginacao.currentPage - 1)}
            disabled={!paginacao.previous}
            style={{ fontSize: '18px', padding: '4px 10px', border: '1px solid #ebebea', borderRadius: '6px', background: '#fff', color: paginacao.previous ? '#444441' : '#d3d1c7', cursor: paginacao.previous ? 'pointer' : 'default' }}
          >
            ←
          </button>
          <span style={{ fontSize: '12px', color: '#888780', padding: '0 4px' }}>
            {paginacao.currentPage}
          </span>
          <button
            onClick={() => onPagina(paginacao.currentPage + 1)}
            disabled={!paginacao.next}
            style={{ fontSize: '18px', padding: '4px 10px', border: '1px solid #ebebea', borderRadius: '6px', background: '#fff', color: paginacao.next ? '#444441' : '#d3d1c7', cursor: paginacao.next ? 'pointer' : 'default' }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}