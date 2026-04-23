import axios from 'axios'

// Instância configurada do Axios
// Toda requisição vai usar essa base automaticamente
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// INTERCEPTOR DE REQUEST
// Executa antes de TODA requisição ser enviada
// Injeta o token JWT automaticamente — sem isso você teria que
// passar o header manualmente em cada chamada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// INTERCEPTOR DE RESPONSE
// Executa depois de TODA resposta recebida
// Se receber 401 (não autorizado), tenta renovar o token automaticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    // Se for 401 e ainda não tentamos renovar o token
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      try {
        const refresh = localStorage.getItem('refresh_token')
        const response = await axios.post(
          'http://localhost:8000/api/auth/refresh/',
          { refresh }
        )

        const newAccess = response.data.access
        localStorage.setItem('access_token', newAccess)

        // Refaz a requisição original com o novo token
        original.headers.Authorization = `Bearer ${newAccess}`
        return api(original)
      } catch {
        // Refresh falhou — desloga o usuário
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api