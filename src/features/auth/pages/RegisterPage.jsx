import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { isAuthRegister } from '../states/authThunks'
import {
  showErrorDialog,
  showSuccessDialog,
} from '../../../helpers/toolsHelper'

export default function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector(
    (state) => state.auth,
  )

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!form.name.trim()) {
      newErrors.name = 'Nama wajib diisi.'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email wajib diisi.'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Format email tidak valid.'
    }

    if (!form.password) {
      newErrors.password = 'Password wajib diisi.'
    } else if (form.password.length < 6) {
      newErrors.password =
        'Password minimal 6 karakter.'
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword =
        'Konfirmasi password wajib diisi.'
    } else if (
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword =
        'Konfirmasi password tidak sama.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    const result = await dispatch(
      isAuthRegister({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    )

    if (isAuthRegister.fulfilled.match(result)) {
      await showSuccessDialog(
        'Akun berhasil dibuat. Silakan login.',
        'Registrasi Berhasil',
      )

      navigate('/auth/login')
    } else {
      showErrorDialog(
        result.payload || 'Registrasi gagal.',
        'Registrasi Gagal',
      )
    }
  }

  return (
    <div>
      <div className="mb-7">
        <h2 className="text-3xl font-bold text-gray-900">
          Buat akun
        </h2>

        <p className="mt-2 text-gray-500">
          Daftar untuk mulai menggunakan Lost & Founds.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Nama
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama lengkap"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

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
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
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
            placeholder="Minimal 6 karakter"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Konfirmasi Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Ulangi password"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-yellow-400 px-4 py-3 font-bold text-yellow-950 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Mendaftarkan...' : 'Daftar'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Sudah punya akun?{' '}
        <Link
          to="/login"
          className="font-bold text-yellow-800 hover:text-yellow-700"
        >
          Masuk
        </Link>
      </p>
    </div>
  )
}