import React from 'react'

const CONTACT_EMAIL = 'dircom@soatransplus.mg'

export default function Contact() {
  // Pas de serveur : le formulaire ouvre le client mail du visiteur avec le message pré-rempli.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = String(data.get('subject') || 'Message depuis le site Soadia Travel')
    const body = `${data.get('message')}

${data.get('name')}
${data.get('email')}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <div>
            <p className="eyebrow mb-3">Nous contacter</p>
            <h2 className="section-title mb-4">Parlons de votre prochain voyage</h2>
            <div className="mb-6 h-0.5 w-16 bg-brand-red" />
            <p className="text-gray-600 leading-relaxed mb-8">
              Notre équipe vous accompagne pour choisir votre trajet, votre classe et vos options de voyage à Madagascar.
            </p>

            <div className="space-y-5">
              <a href="tel:+261373737001" className="flex items-start gap-4 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">☎</span>
                <span>
                  <span className="block text-sm text-gray-500">Téléphone / WhatsApp</span>
                  <span className="font-semibold text-navy group-hover:text-primary transition-colors">+261 37 37 370 01</span>
                </span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-4 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✉</span>
                <span>
                  <span className="block text-sm text-gray-500">Email</span>
                  <span className="font-semibold text-navy group-hover:text-primary transition-colors">{CONTACT_EMAIL}</span>
                </span>
              </a>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">⌖</span>
                <span>
                  <span className="block text-sm text-gray-500">Notre agence</span>
                  <span className="font-semibold text-navy">Antananarivo, Madagascar</span>
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 md:p-10">
            <h3 className="font-serif text-2xl font-medium text-navy mb-6">Envoyez-nous un message</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input required name="name" placeholder="Votre nom" className="w-full border border-slate-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input required type="email" name="email" placeholder="Votre email" className="w-full border border-slate-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <input name="subject" placeholder="Sujet" className="w-full border border-slate-200 rounded-md p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <textarea required name="message" rows={5} placeholder="Comment pouvons-nous vous aider ?" className="w-full border border-slate-200 rounded-md p-3 text-sm mb-4 resize-y focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button type="submit" className="btn-solid w-full sm:w-auto">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
