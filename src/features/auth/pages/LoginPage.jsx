import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { isAuthLogin } from '../states/authThunks'
import { showErrorDialog } from '../../../helpers/toolsHelper'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    isLoading,
    error,
  } = useSelector((state) => state.auth)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  function validate() {
    const newErrors = {}

    if (!form.email.trim()) {
      newErrors.email = 'Email wajib diisi.'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Format email tidak valid.'
    }

    if (!form.password) {
      newErrors.password = 'Password wajib diisi.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    const result = await dispatch(isAuthLogin(form))

    if (isAuthLogin.fulfilled.match(result)) {
      navigate('/')
    } else {
      showErrorDialog(
        result.payload || error || 'Login gagal.',
        'Login Gagal',
      )
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Selamat datang
        </h2>

        <p className="mt-2 text-gray-500">
          Masuk ke akun Lost & Founds kamu.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-yellow-400 px-4 py-3 font-bold text-yellow-950 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="font-bold text-yellow-600 hover:text-yellow-700"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  )
}