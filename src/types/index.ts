export interface Hub {
  id: number
  name: string
  created_at?: string
}

export interface Destination {
  id: number
  name: string
  hub_id: number
  hub_name?: string
}

export interface PlanFeature {
  id: number
  plan_id: number
  name: string
  is_included: number
  sort_order: number
}

export interface Plan {
  id: number
  name: string
  price: string
  period: string
  description: string | null
  is_popular: number
  features: PlanFeature[]
}

export interface VehicleSeat {
  id: number
  vehicle_id: number
  seat_id: string
  row_number: number
  position: number
  status: string
}

export interface Vehicle {
  id: number
  name: string
  description: string | null
  image_url: string | null
  seats: VehicleSeat[]
}

export interface Testimonial {
  id: number
  name: string
  rating: number
  role: string
  comment: string
  avatar: string | null
  color: string | null
  sort_order: number
}

export interface TouristicRoute {
  id: number
  path: string
  start_name: string
  mid_name: string
  end_name: string
  location_start: string
  location_mid: string
  location_end: string
  img_start: string
  img_mid: string
  img_end: string
  frequency: string
  price: number
  sort_order: number
}

export interface FeaturedCity {
  id: number
  title: string
  description: string
  image_url: string
  plan_tags: string
  sort_order: number
}

export interface SiteStat {
  id: number
  label: string
  value: number
  suffix: string
  sort_order: number
}

export interface Reservation {
  id: number
  plan_id: number | null
  vehicle_id: number | null
  reservation_date: string | null
  reservation_time: string | null
  hub_id: number | null
  destination_id: number | null
  payment_method: string | null
  payment_ref: string | null
  total_price: number | null
  selected_seats: string | null
  customer_name: string | null
  customer_email: string | null
  customer_phone: string | null
  status: string
  created_at: string
}

export interface AdminUser {
  id: number
  name: string
  email: string
}

export interface User {
  id: number
  name: string
  email: string
}
