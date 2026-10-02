import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import AuthLayout from './features/auth/layouts/AuthLayout'
import LostFoundLayout from './features/lost-founds/layouts/LostFoundLayout'

const LoginPage = lazy(
  () => import('./features/auth/pages/LoginPage'),
)

const RegisterPage = lazy(
  () => import('./features/auth/pages/RegisterPage'),
)

const HomePage = lazy(
  () => import('./features/lost-founds/pages/HomePage'),
)

const DetailPage = lazy(
  () => import('./features/lost-founds/pages/DetailPage'),
)

const UsersPage = lazy(
  () => import('./features/users/pages/UsersPage'),
)

const ProfilePage = lazy(
  () => import('./features/users/pages/ProfilePage'),
)

function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="text-sm font-medium text-gray-500">
        Memuat halaman...
      </p>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route
          path="/auth"
          element={<AuthLayout />}
        >
          <Route
            path="login"
            element={<LoginPage />}
          />

          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>

        <Route
          path="/"
          element={<LostFoundLayout />}
        >
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="lost-founds/:id"
            element={<DetailPage />}
          />

          <Route
            path="users"
            element={<UsersPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App