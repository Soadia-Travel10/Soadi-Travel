import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AdminAuthProvider } from './context/AdminAuthContext'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import ReservationsPage from './pages/admin/ReservationsPage'
import PlansPage from './pages/admin/PlansPage'
import VehiclesPage from './pages/admin/VehiclesPage'
import HubsPage from './pages/admin/HubsPage'
import RoutesPage from './pages/admin/RoutesPage'
import CitiesPage from './pages/admin/CitiesPage'
import TestimonialsPage from './pages/admin/TestimonialsPage'
import StatsPage from './pages/admin/StatsPage'
import SubscribersPage from './pages/admin/SubscribersPage'
import EmblematicCitiesPage from './pages/admin/EmblematicCitiesPage'
import TeamServicesPage from './pages/admin/TeamServicesPage'

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Site public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin panel protégé */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="plans" element={<PlansPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="hubs" element={<HubsPage />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="subscribers" element={<SubscribersPage />} />
          <Route path="emblematic-cities" element={<EmblematicCitiesPage />} />
          <Route path="team-services" element={<TeamServicesPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  )
}
