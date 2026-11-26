// Pré-rendu : écrit le HTML de la page d'accueil dans dist/index.html,
// pour que les robots puissent lire le contenu sans exécuter JavaScript.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'

const { render, heroImage } = await import('../dist-ssr/entry-server.js')

const file = new URL('../dist/index.html', import.meta.url)
const template = readFileSync(file, 'utf8')
const root = '<div id="root"></div>'
if (!template.includes(root)) {
  throw new Error('Pré-rendu : <div id="root"> introuvable dans dist/index.html')
}

const preload = `  <link rel="preload" as="image" href="${heroImage}" fetchpriority="high" />\n  </head>`
const html = template
  .replace('</head>', () => preload)
  .replace(root, () => `<div id="root">${render('/')}</div>`)

writeFileSync(file, html)
rmSync(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true })
console.log("Pré-rendu de la page d'accueil terminé.")
