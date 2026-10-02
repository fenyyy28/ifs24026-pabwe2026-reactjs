import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isGetUsers } from '../states/userThunks'

export default function UsersPage() {
  const dispatch = useDispatch()

  const {
    users,
    isLoading,
    error,
  } = useSelector(
    (state) => state.users,
  )

  useEffect(() => {
    dispatch(isGetUsers())
  }, [dispatch])

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-600">
            Lost & Founds
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Pengguna
          </h1>

          <p className="mt-2 text-gray-500">
            Daftar pengguna yang terdaftar dalam sistem.
          </p>
        </div>

        {isLoading && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            Memuat data pengguna...
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {!isLoading &&
          !error &&
          users.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              Belum ada pengguna.
            </div>
          )}

        {!isLoading &&
          !error &&
          users.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        user.photo ||
                        'https://ui-avatars.com/api/?name=' +
                          encodeURIComponent(
                            user.name,
                          )
                      }
                      alt={user.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <h2 className="truncate font-bold text-gray-900">
                        {user.name}
                      </h2>

                      <p className="truncate text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4 text-sm text-gray-500">
                    User ID: {user.id}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  )
}