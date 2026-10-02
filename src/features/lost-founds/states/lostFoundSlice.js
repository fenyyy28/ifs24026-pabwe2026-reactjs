import { createSlice } from '@reduxjs/toolkit'

import {
  isLostFound,
  isLostFoundDetail,
  isLostFoundAdd,
  isLostFoundChange,
  isLostFoundChangeCover,
  isLostFoundDelete,
  isLostFoundStats,
} from './lostFoundThunks'

const initialState = {
  lostFounds: [],
  lostFound: null,

  isProfile: false,

  isLostFoundAdd: false,
  isLostFoundAdded: false,

  isLostFoundChange: false,
  isLostFoundChanged: false,

  isLostFoundChangeCover: false,
  isLostFoundChangedCover: false,

  isLostFoundDelete: false,
  isLostFoundDeleted: false,

  lostFoundStats: {
    daily: null,
    monthly: null,
  },

  isLoading: false,
  error: null,
}

const lostFoundSlice = createSlice({
  name: 'lostFounds',
  initialState,

  reducers: {
    clearLostFoundError: (state) => {
      state.error = null
    },

    clearLostFound: (state) => {
      state.lostFound = null
    },

    resetLostFoundFlags: (state) => {
      state.isLostFoundAdd = false
      state.isLostFoundAdded = false
      state.isLostFoundChange = false
      state.isLostFoundChanged = false
      state.isLostFoundChangeCover = false
      state.isLostFoundChangedCover = false
      state.isLostFoundDelete = false
      state.isLostFoundDeleted = false
    },
  },

  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(isLostFound.pending, (state) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(isLostFound.fulfilled, (state, action) => {
        state.isLoading = false
        state.lostFounds = action.payload
      })

      .addCase(isLostFound.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // DETAIL
      .addCase(isLostFoundDetail.pending, (state) => {
        state.isProfile = true
        state.error = null
      })

      .addCase(isLostFoundDetail.fulfilled, (state, action) => {
        state.isProfile = false
        state.lostFound = action.payload
      })

      .addCase(isLostFoundDetail.rejected, (state, action) => {
        state.isProfile = false
        state.error = action.payload
      })

      // ADD
      .addCase(isLostFoundAdd.pending, (state) => {
        state.isLostFoundAdd = true
        state.isLostFoundAdded = false
        state.error = null
      })

      .addCase(isLostFoundAdd.fulfilled, (state) => {
        state.isLostFoundAdd = false
        state.isLostFoundAdded = true
      })

      .addCase(isLostFoundAdd.rejected, (state, action) => {
        state.isLostFoundAdd = false
        state.isLostFoundAdded = false
        state.error = action.payload
      })

      // CHANGE
      .addCase(isLostFoundChange.pending, (state) => {
        state.isLostFoundChange = true
        state.isLostFoundChanged = false
        state.error = null
      })

      .addCase(isLostFoundChange.fulfilled, (state) => {
        state.isLostFoundChange = false
        state.isLostFoundChanged = true
      })

      .addCase(isLostFoundChange.rejected, (state, action) => {
        state.isLostFoundChange = false
        state.isLostFoundChanged = false
        state.error = action.payload
      })

      // COVER
      .addCase(isLostFoundChangeCover.pending, (state) => {
        state.isLostFoundChangeCover = true
        state.isLostFoundChangedCover = false
        state.error = null
      })

      .addCase(isLostFoundChangeCover.fulfilled, (state) => {
        state.isLostFoundChangeCover = false
        state.isLostFoundChangedCover = true
      })

      .addCase(isLostFoundChangeCover.rejected, (state, action) => {
        state.isLostFoundChangeCover = false
        state.isLostFoundChangedCover = false
        state.error = action.payload
      })

      // DELETE
      .addCase(isLostFoundDelete.pending, (state) => {
        state.isLostFoundDelete = true
        state.isLostFoundDeleted = false
        state.error = null
      })

      .addCase(isLostFoundDelete.fulfilled, (state) => {
        state.isLostFoundDelete = false
        state.isLostFoundDeleted = true
      })

      .addCase(isLostFoundDelete.rejected, (state, action) => {
        state.isLostFoundDelete = false
        state.isLostFoundDeleted = false
        state.error = action.payload
      })

      // STATS
      .addCase(isLostFoundStats.pending, (state) => {
        state.error = null
      })

      .addCase(isLostFoundStats.fulfilled, (state, action) => {
        state.lostFoundStats = action.payload
      })

      .addCase(isLostFoundStats.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const {
  clearLostFoundError,
  clearLostFound,
  resetLostFoundFlags,
} = lostFoundSlice.actions

export default lostFoundSlice.reducer