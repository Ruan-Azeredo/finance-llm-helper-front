import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import {AuthProvider} from './contexts/Auth'
import { RequisitionsManagerProvider } from './contexts/RequisitionsManager'
import { TransactionsTemplateProvider } from './contexts/TransactionsTemplate'
import { ThemeProvider } from '@material-tailwind/react'
import App from './App.jsx'
import './index.css'
import RouterManager from './Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ThemeProvider> */}
      <AuthProvider>
        <RequisitionsManagerProvider>
          <TransactionsTemplateProvider>
            <RouterManager/>
          </TransactionsTemplateProvider>
        </RequisitionsManagerProvider>
      </AuthProvider>
    {/* </ThemeProvider> */}
  </StrictMode>,
)
