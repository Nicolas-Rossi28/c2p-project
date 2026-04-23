const cards = (resumo) => [
  { label: 'Total', valor: resumo?.total ?? '—', cor: '#1c1c1a', barra: '#d3d1c7', pct: '100%' },
  { label: 'Ativos', valor: resumo?.ativos ?? '—', cor: '#3b6d11', barra: '#97c459', pct: resumo ? `${Math.round((resumo.ativos / resumo.total) * 100)}%` : '0%' },
  { label: 'Inativos', valor: resumo?.inativos ?? '—', cor: '#a32d2d', barra: '#f09595', pct: resumo ? `${Math.round((resumo.inativos / resumo.total) * 100)}%` : '0%' },
  { label: 'Hoje', valor: resumo?.cadastrados_hoje ?? '—', cor: '#888780', barra: '#d3d1c7', pct: '0%' },
]

export default function CardsResumo({ resumo, carregando }) {
  if (carregando) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '14px' }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ebebea', borderRadius: '10px', padding: '14px 16px', height: '80px', opacity: 0.5 }} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '14px' }}>
      {cards(resumo).map((card) => (
        <div key={card.label} style={{ background: '#fff', border: '1px solid #ebebea', borderRadius: '10px', padding: '14px 16px' }}>
          <div style={{ fontSize: '11px', color: '#888780', marginBottom: '6px', fontWeight: 500 }}>
            {card.label}
          </div>
          <div style={{ fontSize: '26px', fontWeight: 600, color: card.cor, letterSpacing: '-0.5px' }}>
            {card.valor}
          </div>
          <div style={{ height: '2px', borderRadius: '2px', marginTop: '10px', background: '#f1efe8' }}>
            <div style={{ height: '100%', borderRadius: '2px', width: card.pct, background: card.barra, transition: 'width 0.5s ease' }} />
          </div>
        </div>
      ))}
    </div>
  )
}