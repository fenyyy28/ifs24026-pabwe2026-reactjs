import { Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'

import NavbarComponent from '../components/NavbarComponent'
import SidebarComponent from '../components/SidebarComponent'
import { getAccessToken } from '../../../helpers/apiHelper'

function LostFoundLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const token = getAccessToken()

  if (!token) {
 <Navigate to="/auth/login" replace />
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

      <main className="min-h-screen pt-16 lg:pl-64">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default LostFoundLayout