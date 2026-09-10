import type { Destination, FeaturedCity, Hub, Plan, Reservation, SiteStat, Testimonial, TouristicRoute, User, Vehicle } from '../types'

type Entity = Plan | Testimonial | TouristicRoute | FeaturedCity | SiteStat | Hub | Destination | Vehicle | Reservation
type Store = Record<string, Entity[]>

const STORAGE_KEY = 'soadia_frontend_store'

const seats = (vehicleId: number) => ['A1', 'A2', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'E1', 'E2', 'E3']
  .map((seat_id, index) => ({ id: vehicleId * 100 + index, vehicle_id: vehicleId, seat_id, row_number: Math.floor(index / 3) + 1, position: (index % 3) + 1, status: seat_id === 'A2' ? 'unavailable' : 'available' }))

const initialStore: Store = {
  plans: [
    { id: 1, name: 'Base', price: '40000', period: 'par trajet', description: 'Entrée de gamme', is_popular: 1, features: [{ id: 1, plan_id: 1, name: 'Sièges standards', is_included: 1, sort_order: 0 }, { id: 2, plan_id: 1, name: 'Wi-Fi', is_included: 1, sort_order: 1 }] },
    { id: 2, name: 'PREMIUM', price: '50000', period: 'par trajet', description: 'Standard', is_popular: 1, features: [{ id: 3, plan_id: 2, name: 'Sièges confortables', is_included: 1, sort_order: 0 }, { id: 4, plan_id: 2, name: 'Climatisation', is_included: 1, sort_order: 1 }] },
    { id: 3, name: 'VIP', price: '80000', period: 'par trajet', description: 'Haut de gamme', is_popular: 0, features: [{ id: 5, plan_id: 3, name: 'Service à bord personnalisé', is_included: 1, sort_order: 0 }] },
    { id: 4, name: 'VIP+', price: '150000', period: 'par trajet', description: 'Luxe', is_popular: 1, features: [{ id: 6, plan_id: 4, name: 'Repas complet offert', is_included: 1, sort_order: 0 }] },
  ],
  hubs: [{ id: 1, name: 'Antananarivo' }, { id: 2, name: 'Antsirabe' }, { id: 3, name: 'Fianarantsoa' }, { id: 4, name: 'Isalo' }],
  destinations: [{ id: 1, name: 'Ambatolampy', hub_id: 1 }, { id: 2, name: 'Antsirabe', hub_id: 1 }, { id: 3, name: 'Ambositra', hub_id: 2 }, { id: 4, name: 'Fianarantsoa', hub_id: 2 }, { id: 5, name: 'Ranomafana', hub_id: 3 }, { id: 6, name: 'Tuléar', hub_id: 4 }],
  vehicles: [1, 2, 3].map((id) => ({ id, name: `Bus 0${id}`, description: null, image_url: '/images/car/Bus.svg', seats: seats(id) })),
  testimonials: [{ id: 1, name: 'James Thompson', rating: 5, role: 'Client', comment: 'Une expérience inoubliable, parfaitement organisée.', avatar: null, color: 'bg-red-50 border-red-200', sort_order: 0 }, { id: 2, name: 'Randria Aina', rating: 5, role: 'Client', comment: 'Très satisfait du confort et du service.', avatar: null, color: 'bg-teal-50 border-teal-200', sort_order: 1 }],
  'touristic-routes': [{ id: 1, path: 'Antananarivo - Ambatolampy - Antsirabe', start_name: 'Antananarivo', mid_name: 'Ambatolampy', end_name: 'Antsirabe', location_start: 'Antananarivo', location_mid: 'Ambatolampy', location_end: 'Antsirabe', img_start: 'Antananarivo-imp.jpg', img_mid: 'Ambatolampy-imp.jpg', img_end: 'Antsirabe-imp.jpg', frequency: 'Tous les jours', price: 20000, sort_order: 0 }],
  'featured-cities': [{ id: 1, title: 'Antananarivo', description: 'La capitale politique et économique de Madagascar.', image_url: 'Antananarivo-imp.jpg', plan_tags: 'VIP, Premium', sort_order: 0 }, { id: 2, title: 'Antsirabe', description: 'Une ville pleine de charme sur les hauts plateaux.', image_url: 'Antsirabe-imp.jpg', plan_tags: 'VIP, Premium', sort_order: 1 }],
  stats: [{ id: 1, label: 'Villes implémentées à Madagascar', value: 4, suffix: '', sort_order: 0 }, { id: 2, label: 'Classes à prix abordable', value: 4, suffix: '', sort_order: 1 }, { id: 3, label: 'Voitures en service', value: 70, suffix: '+', sort_order: 2 }],
  reservations: [], subscribers: [],
}

function readStore(): Store {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Store
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStore))
  return structuredClone(initialStore)
}

function writeStore(store: Store) { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)) }
function collectionFor(path: string) {
  if (path.startsWith('/countries')) return path.includes('countryId=') ? 'destinations' : 'hubs'
  if (path === '/admin/dashboard') return 'dashboard'
  if (path === '/subscribe') return 'subscribers'
  return path.slice(1).split('/')[0]
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const store = readStore()
  const method = options.method || 'GET'
  const body = options.body ? JSON.parse(String(options.body)) : {}
  const collection = collectionFor(path)
  if (collection === 'dashboard') {
    const reservations = store.reservations as Reservation[]
    const grouped = reservations.reduce<Record<string, { status: string; count: number; total: number }>>((result, item) => { const entry = result[item.status] || { status: item.status, count: 0, total: 0 }; entry.count++; entry.total += item.total_price || 0; result[item.status] = entry; return result }, {})
    return { counts: { reservations: reservations.length, plans: store.plans.length, vehicles: store.vehicles.length, testimonials: store.testimonials.length, subscribers: store.subscribers.length, hubs: store.hubs.length }, recentReservations: reservations.slice(-5).reverse(), revenueByStatus: Object.values(grouped) } as T
  }
  if (collection === 'subscribers' && method === 'POST') { store.subscribers.push({ id: Date.now(), ...body }); writeStore(store); return {} as T }
  if (method === 'GET') {
    let items = (store[collection] || []).slice()
    if (collection === 'destinations' && path.includes('countryId=')) items = items.filter((item) => (item as Destination).hub_id === Number(new URLSearchParams(path.split('?')[1]).get('countryId')))
    if (collection === 'destinations') items = items.map((item) => ({ ...item, hub_name: (store.hubs.find((hub) => hub.id === (item as Destination).hub_id) as Hub)?.name }))
    return items as T
  }
  const parts = path.split('/').filter(Boolean)
  const id = Number(parts[1])
  if (method === 'POST') {
    const item = { id: Date.now(), ...body } as Entity
    if (collection === 'reservations') (item as Reservation).created_at = new Date().toISOString(), (item as Reservation).status = 'pending'
    if (collection === 'plans') (item as Plan).features = (body.features || []).map((feature: any, index: number) => ({ ...feature, id: Date.now() + index, plan_id: item.id, is_included: feature.is_included ? 1 : 0, sort_order: index }))
    store[collection] = [...(store[collection] || []), item]; writeStore(store); return item as T
  }
  if (method === 'PUT') { store[collection] = (store[collection] || []).map((item) => item.id === id ? { ...item, ...body } : item); writeStore(store); return {} as T }
  if (method === 'DELETE') { store[collection] = (store[collection] || []).filter((item) => item.id !== id); writeStore(store); return {} as T }
  throw new Error('Action locale non supportée')
}

export const api = {
  get: <T>(path: string, _auth: 'none' | 'admin' | 'user' = 'none') => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: any, _auth: 'none' | 'admin' | 'user' = 'none') => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: any, _auth: 'none' | 'admin' | 'user' = 'none') => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string, _auth: 'none' | 'admin' | 'user' = 'none') => request<T>(path, { method: 'DELETE' }),
}
