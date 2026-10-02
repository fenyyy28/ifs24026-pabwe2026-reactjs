import { createSlice } from '@reduxjs/toolkit'

import {
  isAuthLogin,
  isAuthRegister,
  isAuthLogout,
} from './authThunks'

const initialState = {
  user: null,
  token: localStorage.getItem('access_token'),

  isLoading: false,
  isAuthLogin: false,
  isAuthRegister: false,
  isAuthLogout: false,

  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },

    setAuthUser: (state, action) => {
      state.user = action.payload
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(isAuthLogin.pending, (state) => {
        state.isLoading = true
        state.isAuthLogin = false
        state.error = null
      })

      .addCase(isAuthLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthLogin = true
        state.user = action.payload.user
        state.token = action.payload.token
      })

      .addCase(isAuthLogin.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthLogin = false
        state.error =
          action.payload || 'Login gagal.'
      })

      // REGISTER
      .addCase(isAuthRegister.pending, (state) => {
        state.isLoading = true
        state.isAuthRegister = false
        state.error = null
      })

      .addCase(isAuthRegister.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthRegister = true
        state.error = null
      })

      .addCase(isAuthRegister.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthRegister = false
        state.error =
          action.payload || 'Registrasi gagal.'
      })

      // LOGOUT
      .addCase(isAuthLogout.pending, (state) => {
        state.isLoading = true
        state.isAuthLogout = false
      })

      .addCase(isAuthLogout.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthLogout = true
        state.user = null
        state.token = null
      })

      .addCase(isAuthLogout.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthLogout = false
        state.user = null
        state.token = null
        state.error =
          action.payload || 'Logout gagal.'
      })
  },
})

export const {
  clearAuthError,
  setAuthUser,
} = authSlice.actions

export default authSlice.reducer