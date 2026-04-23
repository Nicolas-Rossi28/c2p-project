export default function TabelaClientes({
  clientes,
  carregando,
  onEditar,
  onExcluir,
  paginacao,
  onPagina,
}) {
  if (carregando) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
        <p className="text-gray-500 mt-3 text-sm">Carregando clientes...</p>
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Nenhum cliente encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Nome', 'Email', 'Telefone', 'Cidade', 'Estado', 'Status', 'Ações'].map((col) => (
                <th key={col} className="text-left px-4 py-3 text-gray-600 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{cliente.nome}</td>
                <td className="px-4 py-3 text-gray-600">{cliente.email}</td>
                <td className="px-4 py-3 text-gray-600">{cliente.telefone}</td>
                <td className="px-4 py-3 text-gray-600">{cliente.cidade}</td>
                <td className="px-4 py-3 text-gray-600">{cliente.estado}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      cliente.ativo
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {cliente.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditar(cliente)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onExcluir(cliente)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Total: {paginacao.count} clientes
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPagina(paginacao.currentPage - 1)}
            disabled={!paginacao.previous}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Anterior
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            Página {paginacao.currentPage}
          </span>
          <button
            onClick={() => onPagina(paginacao.currentPage + 1)}
            disabled={!paginacao.next}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}