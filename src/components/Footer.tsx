import React from 'react'

const navLinks = [
  { href: '/#about', label: 'Pourquoi nous ?' },
  { href: '/#vehicles', label: 'Notre flotte' },
  { href: '/#location', label: 'Nos destinations' },
  { href: '/#partners', label: 'Nos partenaires' },
  { href: '/#contact', label: 'Contact' },
]

const contacts = [
  { icon: <MapPinIcon />, label: 'Adresse', value: 'Antananarivo, Madagascar' },
  { icon: <PhoneIcon />, label: 'Téléphone / WhatsApp', value: '+261 32 11 924 96', href: 'tel:+261321192496' },
  { icon: <FacebookIcon />, label: 'Facebook', value: 'Soadia Travel', href: 'https://web.facebook.com/people/Soadia-Travel-Madagascar/61590327121742/?locale=fr_FR' },
  { icon: <MailIcon />, label: 'Email', value: 'dircom@soatransplus.mg', href: 'mailto:dircom@soatransplus.mg' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      {/* Bande bleu → rouge, comme les arcs du logo */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary to-brand-red" />

      <div className="container mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr]">
        <div>
          <a href="/" className="inline-flex flex-col leading-none text-white">
            <span className="font-serif text-3xl font-bold tracking-wide">Soadia Travel</span>
            <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.5em] text-white/70">Madagascar</span>
          </a>
          <div className="my-6 h-0.5 w-12 bg-brand-red" />
          <p className="max-w-sm leading-relaxed">
            Voyagez à travers Madagascar avec confort et sécurité. Nous vous accompagnons jusqu'à
            votre destination.
          </p>
          <a href="/#contact" className="btn-outline-light mt-8">
            Nous contacter
          </a>
        </div>

        <div>
          <h3 className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-white">Navigation</h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
                  <span className="h-px w-3 bg-brand-red transition-all duration-300 group-hover:w-5" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-white">Contact</h3>
          <ul className="space-y-5">
            {contacts.map((item) => {
              const content = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sky-300">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.15em] text-white/50">{item.label}</span>
                    <span className="text-white">{item.value}</span>
                  </span>
                </>
              )
              return (
                <li key={item.value}>
                  {item.href ? (
                    <a href={item.href} className="flex items-center gap-3 transition-opacity hover:opacity-80">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Soadia Travel Madagascar. Tous droits réservés.</p>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="inline-flex items-center gap-2 transition-colors hover:text-white">
            Retour en haut <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"></path>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  )
}
