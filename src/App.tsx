import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/layout/ErrorBoundary'
import AuthProvider from './context/AuthProvider'
import CartProvider from './context/CartProvider'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
