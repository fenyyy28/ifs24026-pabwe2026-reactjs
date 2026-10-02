import { NavLink } from 'react-router-dom'
import { FiHome, FiBarChart2, FiUsers, FiUser } from 'react-icons/fi'

function SidebarComponent({ open, onClose }) {
  const menus = [
    {
      name: 'Homepage',
      path: '/',
      icon: <FiHome />,
    },
    {
      name: 'Statistik',
      path: '/statistik',
      icon: <FiBarChart2 />,
    },
    {
      name: 'Pengguna',
      path: '/users',
      icon: <FiUsers />,
    },
    {
      name: 'Profil Saya',
      path: '/profile',
      icon: <FiUser />,
    },
  ]

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          
          {/* Logo */}
          <div className="flex h-20 items-center border-b px-6">
            <div>
              <h1 className="text-xl font-bold text-yellow-800">
                Lost &amp; Founds
              </h1>

              <p className="text-xs text-gray-500">
                Delcom Information System
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Menu
            </p>

            <div className="space-y-2">
              {menus.map((menu) => (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-yellow-400 text-yellow-950 shadow-md'
                        : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-800'
                    }`
                  }
                >
                  <span className="text-lg">
                    {menu.icon}
                  </span>

                  <span>{menu.name}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Informasi */}
          <div className="border-t p-4">
            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-sm font-semibold text-yellow-800">
                Lost &amp; Found
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Temukan dan laporkan barang yang hilang.
              </p>
            </div>
          </div>

        </div>
      </aside>
    </>
  )
}

export default SidebarComponent