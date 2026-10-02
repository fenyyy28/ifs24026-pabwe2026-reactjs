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
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <IconMenu2 size={23} />
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
          <button className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100">
            <IconBell size={21} />
          </button>

          <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
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

          <button
            onClick={onLogout}
            className="rounded-xl p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
            title="Logout"
          >
            <IconLogout size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default NavbarComponent