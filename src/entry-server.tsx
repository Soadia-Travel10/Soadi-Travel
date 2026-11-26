import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import heroImage from './assets/images/avenue-baobab.webp'

// Utilisé uniquement pendant le build, par scripts/prerender.mjs
export { heroImage }

export function render(url: string) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
  )
}
