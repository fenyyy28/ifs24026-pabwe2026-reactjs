import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  getLostFoundsApi,
  getLostFoundApi,
  addLostFoundApi,
  changeLostFoundApi,
  changeLostFoundCoverApi,
  deleteLostFoundApi,
  getLostFoundStatsDailyApi,
  getLostFoundStatsMonthlyApi,
} from '../api/lostFoundApi'

// Mengambil semua laporan Lost & Founds
export const isLostFound = createAsyncThunk(
  'lostFounds/isLostFound',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await getLostFoundsApi(filters)

      if (response.status !== 'success') {
        return rejectWithValue(response.message)
      }

      return response.data?.lost_founds || []
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Mengambil detail satu laporan
export const isLostFoundDetail = createAsyncThunk(
  'lostFounds/isLostFoundDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getLostFoundApi(id)

      if (response.status !== 'success') {
        return rejectWithValue(response.message)
      }

      return response.data?.lost_found || null
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Menambahkan laporan baru
export const isLostFoundAdd = createAsyncThunk(
  'lostFounds/isLostFoundAdd',
  async ({ title, description, status }, { rejectWithValue }) => {
    try {
      const response = await addLostFoundApi(
        title,
        description,
        status
      )

      if (response.status !== 'success') {
        return rejectWithValue(response.message)
      }

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Mengubah laporan
export const isLostFoundChange = createAsyncThunk(
  'lostFounds/isLostFoundChange',
  async (
    {
      id,
      title,
      description,
      status,
      isCompleted,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await changeLostFoundApi(
        id,
        title,
        description,
        status,
        isCompleted
      )

      if (response.status !== 'success') {
        return rejectWithValue(response.message)
      }

      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Mengubah cover/foto laporan
export const isLostFoundChangeCover = createAsyncThunk(
  'lostFounds/isLostFoundChangeCover',
  async ({ id, cover }, { rejectWithValue }) => {
    try {
      const response = await changeLostFoundCoverApi(
        id,
        cover
      )

      if (response.status !== 'success') {
        return rejectWithValue(response.message)
      }

      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Menghapus laporan
export const isLostFoundDelete = createAsyncThunk(
  'lostFounds/isLostFoundDelete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteLostFoundApi(id)

      if (response.status !== 'success') {
        return rejectWithValue(response.message)
      }

      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Mengambil statistik harian dan bulanan
export const isLostFoundStats = createAsyncThunk(
  'lostFounds/isLostFoundStats',
  async (_, { rejectWithValue }) => {
    try {
      const [daily, monthly] = await Promise.all([
        getLostFoundStatsDailyApi(),
        getLostFoundStatsMonthlyApi(),
      ])

      if (
        daily.status !== 'success' ||
        monthly.status !== 'success'
      ) {
        return rejectWithValue(
          'Gagal mengambil data statistik'
        )
      }

      return {
        daily: daily.data,
        monthly: monthly.data,
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)