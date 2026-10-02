import { Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'

import NavbarComponent from '../components/NavbarComponent'
import SidebarComponent from '../components/SidebarComponent'
import { getAccessToken } from '../../../helpers/apiHelper'

function LostFoundLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const token = getAccessToken()

  if (!token) {
    return <Navigate to="/auth/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent
        onMenuClick={() => setSidebarOpen(true)}
      />

      <SidebarComponent
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main
        className="min-h-screen pt-[72px] lg:pl-64"
        aria-label="Konten utama"
      >
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default LostFoundLayout