import { createSlice } from '@reduxjs/toolkit'

import {
  isGetUsers,
  isGetProfile,
  isChangeProfile,
  isChangeProfilePhoto,
  isChangeProfilePassword,
} from './userThunks'

const initialState = {
  users: [],
  user: null,
  profile: null,

  isProfile: false,

  isChangeProfile: false,
  isChangeProfilePhoto: false,
  isChangeProfilePassword: false,

  isLoading: false,

  error: null,
}

const userSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {
    clearUserError: (state) => {
      state.error = null
    },

    clearProfile: (state) => {
      state.profile = null
      state.user = null
      state.isProfile = false
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET USERS
      // =========================

      .addCase(isGetUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(
        isGetUsers.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.users = action.payload
        },
      )

      .addCase(
        isGetUsers.rejected,
        (state, action) => {
          state.isLoading = false
          state.error =
            action.payload ||
            'Gagal mengambil data pengguna.'
        },
      )

      // =========================
      // GET PROFILE
      // =========================

      .addCase(
        isGetProfile.pending,
        (state) => {
          state.isLoading = true
          state.isProfile = false
          state.error = null
        },
      )

      .addCase(
        isGetProfile.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.isProfile = true

          state.profile = action.payload
          state.user = action.payload
        },
      )

      .addCase(
        isGetProfile.rejected,
        (state, action) => {
          state.isLoading = false
          state.isProfile = false

          state.error =
            action.payload ||
            'Gagal mengambil profil.'
        },
      )

      // =========================
      // CHANGE PROFILE
      // =========================

      .addCase(
        isChangeProfile.pending,
        (state) => {
          state.isLoading = true
          state.isChangeProfile = false
          state.error = null
        },
      )

      .addCase(
        isChangeProfile.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.isChangeProfile = true

          state.profile = action.payload
          state.user = action.payload
        },
      )

      .addCase(
        isChangeProfile.rejected,
        (state, action) => {
          state.isLoading = false
          state.isChangeProfile = false

          state.error =
            action.payload ||
            'Gagal memperbarui profil.'
        },
      )

      // =========================
      // CHANGE PHOTO
      // =========================

      .addCase(
        isChangeProfilePhoto.pending,
        (state) => {
          state.isLoading = true
          state.isChangeProfilePhoto = false
          state.error = null
        },
      )

      .addCase(
        isChangeProfilePhoto.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.isChangeProfilePhoto = true

          if (action.payload) {
            state.profile = action.payload
            state.user = action.payload
          }
        },
      )

      .addCase(
        isChangeProfilePhoto.rejected,
        (state, action) => {
          state.isLoading = false
          state.isChangeProfilePhoto = false

          state.error =
            action.payload ||
            'Gagal mengubah foto profil.'
        },
      )

      // =========================
      // CHANGE PASSWORD
      // =========================

      .addCase(
        isChangeProfilePassword.pending,
        (state) => {
          state.isLoading = true
          state.isChangeProfilePassword = false
          state.error = null
        },
      )

      .addCase(
        isChangeProfilePassword.fulfilled,
        (state) => {
          state.isLoading = false
          state.isChangeProfilePassword = true
        },
      )

      .addCase(
        isChangeProfilePassword.rejected,
        (state, action) => {
          state.isLoading = false
          state.isChangeProfilePassword = false

          state.error =
            action.payload ||
            'Gagal mengubah kata sandi.'
        },
      )
  },
})

export const {
  clearUserError,
  clearProfile,
} = userSlice.actions

export default userSlice.reducer