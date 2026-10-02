import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavbarComponent from '../components/NavbarComponent'
import SidebarComponent from '../components/SidebarComponent'

function LostFoundLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleOpenSidebar() {
    setSidebarOpen(true)
  }

  function handleCloseSidebar() {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent onMenuClick={handleOpenSidebar} />

      <SidebarComponent
        open={sidebarOpen}
        onClose={handleCloseSidebar}
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