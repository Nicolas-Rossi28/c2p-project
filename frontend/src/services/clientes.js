import api from './api'

// Todas as chamadas relacionadas a clientes ficam aqui
// As páginas não sabem como a API funciona — só chamam essas funções
// Isso é o princípio de separação de responsabilidades

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
    // PATCH atualiza só os campos enviados
    // PUT exigiria enviar todos os campos
    return api.patch(`/clientes/${id}/`, dados)
  },

  excluir: (id) => {
    return api.delete(`/clientes/${id}/`)
  },

  resumo: () => {
    return api.get('/clientes/resumo/')
  },
}