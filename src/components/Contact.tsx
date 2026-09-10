import React, { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <section id="contact" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Nous contacter</p>
            <h2 className="text-2xl md:text-3xl font-bold text-sky-950 mb-4">Parlons de votre prochain voyage</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Notre équipe vous accompagne pour choisir votre trajet, votre classe et vos options de voyage à Madagascar.
            </p>

            <div className="space-y-5">
              <a href="tel:+261373737001" className="flex items-start gap-4 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">☎</span>
                <span>
                  <span className="block text-sm text-gray-500">Téléphone / WhatsApp</span>
                  <span className="font-semibold text-sky-950 group-hover:text-primary transition-colors">+261 37 37 370 01</span>
                </span>
              </a>
              <a href="mailto:dircom@soatransplus.mg" className="flex items-start gap-4 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✉</span>
                <span>
                  <span className="block text-sm text-gray-500">Email</span>
                  <span className="font-semibold text-sky-950 group-hover:text-primary transition-colors">dircom@soatransplus.mg</span>
                </span>
              </a>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">⌖</span>
                <span>
                  <span className="block text-sm text-gray-500">Notre agence</span>
                  <span className="font-semibold text-sky-950">Antananarivo, Madagascar</span>
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-sky-950 mb-6">Envoyez-nous un message</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input required name="name" placeholder="Votre nom" className="w-full border border-slate-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input required type="email" name="email" placeholder="Votre email" className="w-full border border-slate-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <input name="subject" placeholder="Sujet" className="w-full border border-slate-200 rounded-md p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <textarea required name="message" rows={5} placeholder="Comment pouvons-nous vous aider ?" className="w-full border border-slate-200 rounded-md p-3 text-sm mb-4 resize-y focus:outline-none focus:ring-2 focus:ring-primary/30" />
            {sent && <p className="text-sm text-green-700 bg-green-50 rounded-md p-3 mb-4">Votre message a bien été préparé. Notre équipe vous répondra rapidement.</p>}
            <button type="submit" className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
