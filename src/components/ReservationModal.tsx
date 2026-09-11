import React, { useState, useEffect } from 'react'
import { api } from '../lib/api'
import type { Plan, Hub, Destination, Vehicle } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedPlan: Plan | null
}

export default function ReservationModal({ isOpen, onClose, selectedPlan }: Props) {
  const [hubId, setHubId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentRef, setPaymentRef] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [hubs, setHubs] = useState<Hub[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [vehicleId, setVehicleId] = useState('')
  const [loadingDest, setLoadingDest] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      api.get<Hub[]>('/countries').then(setHubs).catch(() => {})
      api.get<Vehicle[]>('/vehicles').then((v) => {
        setVehicles(v)
        if (v.length > 0) setVehicleId(v[0].id.toString())
      }).catch(() => {})
    }
  }, [isOpen])

  useEffect(() => {
    if (!hubId) {
      setDestinations([])
      return
    }
    setLoadingDest(true)
    api.get<Destination[]>(`/countries?countryId=${hubId}`)
      .then(setDestinations)
      .finally(() => setLoadingDest(false))
    setDestinationId('')
  }, [hubId])

  const timeSlots = Array.from({ length: 4 }, (_, i) => {
    const h = i + 10
    return `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`
  })

  const currentVehicle = vehicles.find((v) => v.id.toString() === vehicleId)
  const isValid = hubId && destinationId && date && time && paymentMethod && customerName && selectedSeats.length > 0

  const toggleSeat = (seatId: string, status: string) => {
    if (status !== 'available') return
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    )
  }

  const resetForm = () => {
    setHubId('')
    setDestinationId('')
    setDate('')
    setTime('')
    setPaymentMethod('')
    setPaymentRef('')
    setCustomerName('')
    setCustomerEmail('')
    setCustomerPhone('')
    setSelectedSeats([])
    setSuccess(false)
    setError('')
  }

  const handleSubmit = async () => {
    if (!isValid || !selectedPlan) return
    setSubmitting(true)
    setError('')
    try {
      const total = parseFloat(selectedPlan.price) * selectedSeats.length
      await api.post('/reservations', {
        plan_id: selectedPlan.id,
        vehicle_id: parseInt(vehicleId),
        reservation_date: date,
        reservation_time: time,
        country_id: parseInt(hubId),
        city_id: parseInt(destinationId),
        payment_method: paymentMethod,
        payment_ref: paymentRef,
        total_price: total,
        selected_seats: selectedSeats,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      })
      setSuccess(true)
    } catch (e: any) {
      setError(e.message || 'Erreur lors de la réservation')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-[900px] w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 relative">
        <button
          onClick={() => { onClose(); resetForm(); }}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {success ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-2">Réservation confirmée</h3>
            <p className="text-gray-600 mb-6">Votre réservation a été créée avec succès.</p>
            <button
              onClick={() => { onClose(); resetForm(); }}
              className="bg-primary text-white px-6 py-2 rounded font-semibold"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-1">Faire une Réservation</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Remplissez le formulaire ci-dessous pour votre plan de reservation {selectedPlan?.name}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Ville</label>
                    <select
                      value={hubId}
                      onChange={(e) => setHubId(e.target.value)}
                      className="w-full border rounded p-2 text-sm"
                    >
                      <option value="">Choisissez le ville</option>
                      {hubs.map((h) => (
                        <option key={h.id} value={h.id}>{h.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Déstination</label>
                    <select
                      value={destinationId}
                      onChange={(e) => setDestinationId(e.target.value)}
                      disabled={!hubId || loadingDest}
                      className="w-full border rounded p-2 text-sm disabled:bg-gray-100"
                    >
                      <option value="">{loadingDest ? 'Loading...' : 'Selectionner une ville'}</option>
                      {destinations.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border rounded p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Heure</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full border rounded p-2 text-sm"
                    >
                      <option value="">Sélectionner</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Véhicule</label>
                  <select
                    value={vehicleId}
                    onChange={(e) => { setVehicleId(e.target.value); setSelectedSeats([]) }}
                    className="w-full border rounded p-2 text-sm"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full border rounded p-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Email</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="email@exemple.com"
                      className="w-full border rounded p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Téléphone</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="03X XX XXX XX"
                      className="w-full border rounded p-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Méthode de paiement</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                  >
                    <option value="">Sélectionner</option>
                    <option value="oragemoney">OrangeMoney : 032 22 222 22</option>
                    <option value="mvola">MVola</option>
                    <option value="cash">Cash à l'agence</option>
                  </select>
                </div>
                {paymentMethod && paymentMethod !== 'cash' && (
                  <div>
                    <label className="text-sm font-medium block mb-1">Référence de paiement</label>
                    <input
                      type="text"
                      value={paymentRef}
                      onChange={(e) => setPaymentRef(e.target.value)}
                      placeholder="Numéro de transaction"
                      className="w-full border rounded p-2 text-sm"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Sélectionnez vos sièges ({currentVehicle?.name})
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {currentVehicle?.seats.map((seat) => {
                      const isSelected = selectedSeats.includes(seat.id.toString())
                      const isAvailable = seat.status === 'available'
                      return (
                        <button
                          key={seat.id}
                          onClick={() => toggleSeat(seat.id.toString(), seat.status)}
                          disabled={!isAvailable}
                          className={`p-2 sm:p-2.5 rounded text-xs font-semibold border transition ${
                            isSelected
                              ? 'bg-primary text-white border-primary'
                              : isAvailable
                              ? 'bg-white hover:bg-blue-50 border-gray-300'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                          }`}
                        >
                          {seat.seat_id}
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-white border border-gray-300 rounded inline-block"></span> Disponible</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary rounded inline-block"></span> Sélectionné</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-300 rounded inline-block"></span> Occupé</span>
                  </div>
                </div>

                {selectedPlan && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Plan sélectionné</span>
                      <span className="font-semibold">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Prix unitaire</span>
                      <span>{parseFloat(selectedPlan.price).toLocaleString('fr-FR')} MGA</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sièges sélectionnés</span>
                      <span>{selectedSeats.length}</span>
                    </div>
                    <div className="flex justify-between font-bold text-primary border-t pt-2 mt-2">
                      <span>Total</span>
                      <span>{(parseFloat(selectedPlan.price) * selectedSeats.length).toLocaleString('fr-FR')} MGA</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => { onClose(); resetForm(); }}
                className="px-4 py-2 rounded border text-sm font-medium hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid || submitting}
                className="px-6 py-2 rounded bg-primary text-white text-sm font-semibold disabled:opacity-50 hover:bg-primary/90"
              >
                {submitting ? 'Envoi...' : 'Confirmer la réservation'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
