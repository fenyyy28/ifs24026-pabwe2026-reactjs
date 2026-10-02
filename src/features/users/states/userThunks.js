import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  getUsersApi,
  getProfileApi,
  updateProfileApi,
  changeProfilePhotoApi,
  changeProfilePasswordApi,
} from '../api/userApi'

export const isGetUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsersApi()

      if (response.status !== 'success') {
        return rejectWithValue(
          response.message ||
            'Gagal mengambil data pengguna.',
        )
      }

      return response.data?.users || []
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const isGetProfile = createAsyncThunk(
  'users/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfileApi()

      if (response.status !== 'success') {
        return rejectWithValue(
          response.message ||
            'Gagal mengambil profil.',
        )
      }

      return response.data?.user || null
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const isChangeProfile = createAsyncThunk(
  'users/changeProfile',
  async (
    { name, email },
    { rejectWithValue },
  ) => {
    try {
      const response =
        await updateProfileApi(
          name,
          email,
        )

      if (response.status !== 'success') {
        return rejectWithValue(
          response.message ||
            'Gagal memperbarui profil.',
        )
      }

      return response.data?.user || null
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const isChangeProfilePhoto =
  createAsyncThunk(
    'users/changeProfilePhoto',
    async (
      photo,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await changeProfilePhotoApi(photo)

        if (response.status !== 'success') {
          return rejectWithValue(
            response.message ||
              'Gagal mengubah foto profil.',
          )
        }

        return response.data?.user || null
      } catch (error) {
        return rejectWithValue(error.message)
      }
    },
  )

export const isChangeProfilePassword =
  createAsyncThunk(
    'users/changeProfilePassword',
    async (
      {
        password,
        newPassword,
        newPasswordConfirmation,
      },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await changeProfilePasswordApi(
            password,
            newPassword,
            newPasswordConfirmation,
          )

        if (response.status !== 'success') {
          return rejectWithValue(
            response.message ||
              'Gagal mengubah kata sandi.',
          )
        }

        return response
      } catch (error) {
        return rejectWithValue(error.message)
      }
    },
  )