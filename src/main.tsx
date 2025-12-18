import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import './index.css'
import { AuthProvider } from '@/context/AuthProvider.tsx'
import { Container } from './modules/Container.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Container />
        <Toaster closeButton expand richColors position="bottom-right" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)