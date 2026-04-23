import { useState } from 'react'

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO'
]

const FORM_INICIAL = {
  nome: '', email: '', telefone: '',
  cidade: '', estado: '', ativo: true,
}

export default function ModalCliente({ cliente, onSalvar, onFechar, salvando }) {
  const [form, setForm] = useState(cliente ?? FORM_INICIAL)
  const [erros, setErros] = useState({})

  const validar = () => {
    const novosErros = {}
    if (!form.nome.trim()) novosErros.nome = 'Nome é obrigatório'
    if (!form.email.trim()) novosErros.email = 'Email é obrigatório'
    if (!/\S+@\S+\.\S+/.test(form.email)) novosErros.email = 'Email inválido'
    if (!form.telefone.trim()) novosErros.telefone = 'Telefone é obrigatório'
    if (!form.estado) novosErros.estado = 'Estado é obrigatório'
    return novosErros
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }
    onSalvar(form)
  }

  const campo = (label, name, tipo = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={tipo}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          erros[name] ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {erros[name] && (
        <p className="text-red-500 text-xs mt-1">{erros[name]}</p>
      )}
    </div>
  )

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {cliente?.id ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button
            onClick={onFechar}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {campo('Nome', 'nome')}
          {campo('Email', 'email', 'email')}
          {campo('Telefone', 'telefone', 'tel')}
          {campo('Cidade', 'cidade')}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                erros.estado ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Selecione...</option>
              {ESTADOS.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
            {erros.estado && (
              <p className="text-red-500 text-xs mt-1">{erros.estado}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="ativo"
              checked={form.ativo}
              onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
              className="w-4 h-4 accent-blue-600"
            />
            <label htmlFor="ativo" className="text-sm font-medium text-gray-700">
              Cliente ativo
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}