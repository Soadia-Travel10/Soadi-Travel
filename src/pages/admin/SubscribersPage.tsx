import React, { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import DataTable from '../../components/admin/DataTable'

interface Subscriber {
  id: number
  email: string
  created_at: string
}

export default function SubscribersPage() {
  const [items, setItems] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<Subscriber[]>('/subscribers', 'admin').then(setItems).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-sky-950">Abonnés newsletter</h1>
      <DataTable
        rowKey={(r) => r.id}
        columns={[
          { key: 'email', label: 'Email' },
          { key: 'created_at', label: "Date d'inscription" },
        ]}
        rows={items}
      />
    </div>
  )
}
