import api from './api'

export const clientesService = {

  listar: (params = {}) => {
    const limpos = Object.fromEntries(
      Object.entries(params).filter(([, valor]) => valor !== '' && valor !== null && valor !== undefined)
    )
    return api.get('/clientes/', { params: limpos })
  },

  buscarPorId: (id) => {
    return api.get(`/clientes/${id}/`)
  },

  criar: (dados) => {
    return api.post('/clientes/', dados)
  },

  atualizar: (id, dados) => {
    return api.patch(`/clientes/${id}/`, dados)
  },

  excluir: (id) => {
    return api.delete(`/clientes/${id}/`)
  },

  resumo: () => {
    return api.get('/clientes/resumo/')
  },
}