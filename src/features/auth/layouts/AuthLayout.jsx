import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AuthLayout() {
  const token = useSelector((state) => state.auth.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="min-h-screen bg-yellow-50 p-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

          <div className="hidden bg-yellow-400 p-10 md:flex md:flex-col md:justify-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-950">
              Lost & Founds
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-yellow-950">
              Temukan barang yang hilang.
            </h1>

            <p className="mt-5 text-yellow-900">
              Laporkan barang hilang atau barang temuan
              dengan mudah melalui satu aplikasi.
            </p>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}