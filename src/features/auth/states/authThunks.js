import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  loginApi,
  registerApi,
  logoutApi,
} from '../api/authApi'

import { putAccessToken } from '../../../helpers/apiHelper'

export const isAuthLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginApi(email, password)

      if (response.status !== 'success') {
        return rejectWithValue(
          response.message || 'Login gagal.',
        )
      }

      const token = response.data?.token
      const user = response.data?.user

      if (!token) {
        return rejectWithValue(
          'Token login tidak ditemukan.',
        )
      }

      putAccessToken(token)

      return {
        token,
        user,
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const isAuthRegister = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerApi(
        name,
        email,
        password,
      )

      if (response.status !== 'success') {
        return rejectWithValue(
          response.message || 'Registrasi gagal.',
        )
      }

      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const isAuthLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi()

      putAccessToken(null)

      return response
    } catch (error) {
      putAccessToken(null)

      return rejectWithValue(error.message)
    }
  },
)