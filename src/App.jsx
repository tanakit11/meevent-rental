import { useState, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import AdminPage from './components/AdminPage'
import Toast from './components/Toast'
import { initialState } from './data/initialData'

export default function App() {
  const [page, setPage] = useState('home')
  const [state, setState] = useState(() => {
  const saved = localStorage.getItem('meevent-data')
  return saved ? JSON.parse(saved) : initialState
})
useEffect(() => {
  localStorage.setItem('meevent-data', JSON.stringify(state))
}, [state])
  const [toast, setToast] = useState('')

  const showToast = useCallback((msg) => setToast(msg), [])

  const handleLogin = () => {
    setPage('admin')
  }

  const handleLogout = () => {
    setPage('home')
  }

  return (
    <>
      <Navbar page={page} onNavigate={setPage} />

      {page === 'home' && (
        <HomePage
          products={state.products}
          cats={state.cats}
          onNavigate={setPage}
        />
      )}

      {page === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onBack={() => setPage('home')}
        />
      )}

      {page === 'admin' && (
        <AdminPage
          state={state}
          onUpdate={setState}
          onLogout={handleLogout}
          showToast={showToast}
        />
      )}

      <Toast message={toast} onHide={() => setToast('')} />
    </>
  )
}
