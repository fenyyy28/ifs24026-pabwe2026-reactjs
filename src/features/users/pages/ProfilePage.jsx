import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  isGetProfile,
  isChangeProfile,
  isChangeProfilePhoto,
  isChangeProfilePassword,
} from '../states/userThunks'

import {
  showErrorDialog,
  showSuccessDialog,
} from '../../../helpers/toolsHelper'

export default function ProfilePage() {
  const dispatch = useDispatch()

  const {
    profile,
    isLoading,
    error,
  } = useSelector(
    (state) => state.users,
  )

  const [profileForm, setProfileForm] =
    useState({
      name: '',
      email: '',
    })

  const [passwordForm, setPasswordForm] =
    useState({
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
    })

  useEffect(() => {
    dispatch(isGetProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || '',
        email: profile.email || '',
      })
    }
  }, [profile])

  function handleProfileChange(event) {
    const { name, value } = event.target

    setProfileForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleUpdateProfile(event) {
    event.preventDefault()

    if (
      !profileForm.name.trim() ||
      !profileForm.email.trim()
    ) {
      showErrorDialog(
        'Nama dan email wajib diisi.',
        'Data belum lengkap',
      )

      return
    }

    const result = await dispatch(
      isChangeProfile(profileForm),
    )

    if (
      isChangeProfile.fulfilled.match(result)
    ) {
      showSuccessDialog(
        'Profil berhasil diperbarui.',
      )
    } else {
      showErrorDialog(
        result.payload ||
          'Gagal memperbarui profil.',
      )
    }
  }

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const result = await dispatch(
      isChangeProfilePhoto(file),
    )

    if (
      isChangeProfilePhoto.fulfilled.match(
        result,
      )
    ) {
      showSuccessDialog(
        'Foto profil berhasil diperbarui.',
      )

      dispatch(isGetProfile())
    } else {
      showErrorDialog(
        result.payload ||
          'Gagal mengubah foto profil.',
      )
    }
  }

  async function handleChangePassword(event) {
    event.preventDefault()

    if (
      !passwordForm.password ||
      !passwordForm.newPassword ||
      !passwordForm.newPasswordConfirmation
    ) {
      showErrorDialog(
        'Semua kolom password wajib diisi.',
        'Data belum lengkap',
      )

      return
    }

    if (
      passwordForm.newPassword !==
      passwordForm.newPasswordConfirmation
    ) {
      showErrorDialog(
        'Konfirmasi password baru tidak sama.',
        'Password tidak cocok',
      )

      return
    }

    const result = await dispatch(
      isChangeProfilePassword(
        passwordForm,
      ),
    )

    if (
      isChangeProfilePassword.fulfilled.match(
        result,
      )
    ) {
      showSuccessDialog(
        'Kata sandi berhasil diubah.',
      )

      setPasswordForm({
        password: '',
        newPassword: '',
        newPasswordConfirmation: '',
      })
    } else {
      showErrorDialog(
        result.payload ||
          'Gagal mengubah kata sandi.',
      )
    }
  }

  if (isLoading && !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-yellow-50">
        <p className="text-gray-500">
          Memuat profil...
        </p>
      </main>
    )
  }

  if (error && !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-yellow-50 p-6">
        <div className="rounded-2xl bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-800">
            Akun
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Profil Saya
          </h1>

          <p className="mt-2 text-gray-500">
            Kelola informasi dan keamanan akun kamu.
          </p>
        </div>

        {/* PROFIL */}
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <img
              src={
                profile?.photo ||
                'https://ui-avatars.com/api/?name=' +
                  encodeURIComponent(
                    profile?.name || 'User',
                  )
              }
              alt={profile?.name || 'User'}
              className="h-28 w-28 rounded-full object-cover ring-4 ring-yellow-100"
            />

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {profile?.name}
              </h2>

              <p className="text-gray-500">
                {profile?.email}
              </p>

              <label className="mt-4 inline-block cursor-pointer rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-yellow-950 hover:bg-yellow-500">
                Ganti Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </section>

        {/* DATA PROFIL */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Informasi Profil
          </h2>

          <form
            onSubmit={handleUpdateProfile}
            className="mt-5 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nama
              </label>

              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-yellow-400 px-5 py-3 font-bold text-yellow-950 hover:bg-yellow-500 disabled:opacity-50"
            >
              Simpan Perubahan
            </button>
          </form>
        </section>

        {/* PASSWORD */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Ganti Kata Sandi
          </h2>

          <form
            onSubmit={handleChangePassword}
            className="mt-5 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password Saat Ini
              </label>

              <input
                type="password"
                name="password"
                value={passwordForm.password}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password Baru
              </label>

              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Konfirmasi Password Baru
              </label>

              <input
                type="password"
                name="newPasswordConfirmation"
                value={
                  passwordForm.newPasswordConfirmation
                }
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-gray-900 px-5 py-3 font-bold text-white hover:bg-gray-800 disabled:opacity-50"
            >
              Ubah Kata Sandi
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}