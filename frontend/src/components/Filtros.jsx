const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO'
]

export default function Filtros({ filtros, onChange, onNovo }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
      <div className="flex flex-wrap gap-3">
        {/* Busca textual */}
        <input
          type="text"
          placeholder="Buscar por nome, email ou cidade..."
          value={filtros.search}
          onChange={(e) => onChange({ ...filtros, search: e.target.value, page: 1 })}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filtro por estado */}
        <select
          value={filtros.estado}
          onChange={(e) => onChange({ ...filtros, estado: e.target.value, page: 1 })}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os estados</option>
          {ESTADOS.map((uf) => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>

        {/* Filtro por status */}
        <select
          value={filtros.ativo}
          onChange={(e) => onChange({ ...filtros, ativo: e.target.value, page: 1 })}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os status</option>
          <option value="true">Ativos</option>
          <option value="false">Inativos</option>
        </select>
      </div>

      {/* Botão novo cliente */}
      <button
        onClick={onNovo}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        + Novo Cliente
      </button>
    </div>
  )
}