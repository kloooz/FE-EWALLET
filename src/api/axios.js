import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (import.meta.env.VITE_DEBUG === 'true') {
    // helpful debug in browser console when explicitly enabled
    // eslint-disable-next-line no-console
    console.log('[api] request', config.method, config.url, config.data)
  }
  return config
})

// Handle 401 globally — but NOT for auth endpoints (login, register, etc.)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (import.meta.env.VITE_DEBUG === 'true') {
      // eslint-disable-next-line no-console
      console.log('[api] response error', err?.response?.status, err?.response?.data)
    }

    const requestUrl = err?.config?.url || ''
    const isAuthEndpoint = requestUrl.includes('/login') || requestUrl.includes('/register')
    const isOnLoginPage = window.location.pathname === '/login'

    // Only redirect to login if 401 comes from a PROTECTED endpoint (not login itself)
    if (err?.response?.status === 401 && !isAuthEndpoint && !isOnLoginPage) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(err)
  }
)

export default api
