import { Navigate, Route, Routes } from 'react-router-dom'

import AuthLayout from './features/auth/layouts/AuthLayout'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'

import LostFoundLayout from './features/lost-founds/layouts/LostFoundLayout'
import HomePage from './features/lost-founds/pages/HomePage'
import DetailPage from './features/lost-founds/pages/DetailPage'

import UsersPage from './features/users/pages/UsersPage'
import ProfilePage from './features/users/pages/ProfilePage'

import { getAccessToken } from './helpers/apiHelper'

function ProtectedRoute({ children }) {
  const token = getAccessToken()

  if (!token) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* PROTECTED */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LostFoundLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="lost-founds/:id" element={<DetailPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* DEFAULT */}
      <Route
        path="*"
        element={<Navigate to="/auth/login" replace />}
      />
    </Routes>
  )
}

export default App