export default function ModalConfirmacao({ cliente, onConfirmar, onCancelar, excluindo }) {
  if (!cliente) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}>
      <div style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid #ebebea', padding: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1c1c1a', marginBottom: '8px' }}>
          Confirmar exclusão
        </div>
        <p style={{ fontSize: '13px', color: '#5f5e5a', marginBottom: '20px', lineHeight: 1.5 }}>
          Tem certeza que deseja excluir <strong style={{ color: '#1c1c1a' }}>{cliente.nome}</strong>? Essa ação não pode ser desfeita.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onCancelar} style={{ flex: 1, padding: '8px', border: '1px solid #ebebea', borderRadius: '7px', fontSize: '13px', color: '#5f5e5a', background: '#fafaf8', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button onClick={onConfirmar} disabled={excluindo} style={{ flex: 1, padding: '8px', border: '1px solid #f09595', borderRadius: '7px', fontSize: '13px', fontWeight: 500, color: '#a32d2d', background: '#fcebeb', cursor: 'pointer', opacity: excluindo ? 0.6 : 1 }}>
            {excluindo ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  )
}