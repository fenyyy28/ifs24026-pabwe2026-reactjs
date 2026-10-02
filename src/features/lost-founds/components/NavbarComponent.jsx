import {
  IconMenu2,
  IconBell,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react'

function NavbarComponent({
  onMenuClick,
  profile,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center justify-between px-4 md:px-6">

        <div className="flex items-center gap-3">
          {/* Tombol menu mobile */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Buka menu navigasi"
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <IconMenu2 size={23} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 font-black text-slate-900">
              LF
            </div>

            <div>
              <h1 className="text-lg font-extrabold text-slate-900">
                Lost & Founds
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Temukan kembali barangmu
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">

          {/* Tombol notifikasi */}
          <button
            type="button"
            aria-label="Notifikasi"
            className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
          >
            <IconBell
              size={21}
              aria-hidden="true"
            />
          </button>

          {/* Profil pengguna */}
          <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 sm:flex">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-700"
              aria-hidden="true"
            >
              <IconUserCircle size={22} />
            </div>

            <div className="max-w-[140px]">
              <p className="truncate text-sm font-bold text-slate-800">
                {profile?.name || 'Pengguna'}
              </p>

              <p className="truncate text-xs text-slate-500">
                {profile?.email || ''}
              </p>
            </div>
          </div>

          {/* Tombol logout */}
          <button
            type="button"
            onClick={onLogout}
            aria-label="Keluar dari akun"
            title="Keluar dari akun"
            className="rounded-xl p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-700"
          >
            <IconLogout
              size={20}
              aria-hidden="true"
            />
          </button>

        </div>
      </div>
    </header>
  )
}

export default NavbarComponent