import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { GameSessionProvider } from './context/GameSessionContext.tsx'
import './css/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GameSessionProvider>
        <App />
      </GameSessionProvider>
    </BrowserRouter>
  </StrictMode>,
)
