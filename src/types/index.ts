export interface Partenaire {
  id: string
  nom: string
  image: string | null
  created_at: string
}

export interface NosImplementation {
  id: string
  nom: string
  image: string | null
  categorie: string | null
  description: string | null
  created_at: string
}

export interface VehicleType {
  id: string
  nom: string
  type: string | null
  image: string | null
  created_at: string
}

