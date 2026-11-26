import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const container = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Seule la page d'accueil est pré-rendue : on reprend son HTML, sinon on affiche normalement.
if (container.hasChildNodes() && window.location.pathname === '/') {
  ReactDOM.hydrateRoot(container, app)
} else {
  container.innerHTML = ''
  ReactDOM.createRoot(container).render(app)
}
