export default function ModalConfirmacao({ cliente, onConfirmar, onCancelar, excluindo }) {
  if (!cliente) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Confirmar exclusão
        </h2>
        <p className="text-gray-600 mb-6">
          Tem certeza que deseja excluir <strong>{cliente.nome}</strong>?
          Essa ação não pode ser desfeita.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancelar}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            disabled={excluindo}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {excluindo ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  )
}