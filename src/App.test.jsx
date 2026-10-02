import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'

import App from './App'

const testStore = configureStore({
  reducer: {
    auth: (state = {
      isLoading: false,
      error: null,
      isLoggedIn: false,
      user: null,
    }) => state,

    users: (state = {
      isLoading: false,
      error: null,
      data: [],
    }) => state,

    lostFounds: (state = {
      isLoading: false,
      error: null,
      lostFounds: [],
      data: [],
      items: [],
    }) => state,
  },
})

describe('App', () => {
  it('merender halaman homepage', () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByRole('heading', { name: 'Lost & Founds', level: 2 }))
  .toBeInTheDocument()
  })
})