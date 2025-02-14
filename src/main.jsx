import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TransactionsTemplateProvider } from './contexts/TransactionsTemplate'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TransactionsTemplateProvider>
      <App />
    </TransactionsTemplateProvider>
  </StrictMode>,
)
