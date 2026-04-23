export default function CardsResumo({ resumo, carregando }) {
  const cards = [
    {
      label: 'Total de Clientes',
      valor: resumo?.total ?? '—',
      cor: 'bg-blue-50 border-blue-200',
      corTexto: 'text-blue-700',
      corValor: 'text-blue-900',
    },
    {
      label: 'Clientes Ativos',
      valor: resumo?.ativos ?? '—',
      cor: 'bg-green-50 border-green-200',
      corTexto: 'text-green-700',
      corValor: 'text-green-900',
    },
    {
      label: 'Clientes Inativos',
      valor: resumo?.inativos ?? '—',
      cor: 'bg-red-50 border-red-200',
      corTexto: 'text-red-700',
      corValor: 'text-red-900',
    },
    {
      label: 'Cadastrados Hoje',
      valor: resumo?.cadastrados_hoje ?? '—',
      cor: 'bg-purple-50 border-purple-200',
      corTexto: 'text-purple-700',
      corValor: 'text-purple-900',
    },
  ]

  if (carregando) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.cor} border rounded-xl p-4`}
        >
          <p className={`text-sm font-medium ${card.corTexto}`}>
            {card.label}
          </p>
          <p className={`text-3xl font-bold mt-1 ${card.corValor}`}>
            {card.valor}
          </p>
        </div>
      ))}
    </div>
  )
}