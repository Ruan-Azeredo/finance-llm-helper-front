import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TransactionsTemplateProvider } from './contexts/TransactionsTemplate'
import { RequisitionsManagerProvider } from './contexts/RequisitionsManager'
import { ThemeProvider } from '@material-tailwind/react'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ThemeProvider> */}
    <RequisitionsManagerProvider>
      <TransactionsTemplateProvider>
        <App />
      </TransactionsTemplateProvider>
    </RequisitionsManagerProvider>
    {/* </ThemeProvider> */}
  </StrictMode>,
)
