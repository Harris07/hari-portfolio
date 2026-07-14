import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

window.history.scrollRestoration = 'manual'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
