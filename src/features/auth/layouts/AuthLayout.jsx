import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <main
        className="min-h-screen"
        aria-label="Halaman autentikasi"
      >
        <div className="grid min-h-screen md:grid-cols-2">
          <div className="hidden bg-yellow-400 p-10 md:flex md:flex-col md:justify-center">
            <div className="mx-auto max-w-md">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-yellow-900">
                Lost &amp; Founds
              </p>

              <h1 className="text-4xl font-extrabold leading-tight text-yellow-950">
                Temukan kembali barang yang hilang.
              </h1>

              <p className="mt-5 text-base leading-7 text-yellow-900">
                Laporkan barang yang hilang atau temukan barang yang
                dilaporkan oleh pengguna lain dengan mudah.
              </p>
            </div>
          </div>

          <div className="flex min-h-screen items-center justify-center bg-white p-6">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuthLayout