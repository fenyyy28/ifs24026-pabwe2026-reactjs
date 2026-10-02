import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import App from './App'

const testStore = configureStore({
  reducer: {
    auth: (state = {
      token: null,
      user: null,
      isLoading: false,
      isAuthLogin: false,
      isAuthRegister: false,
    }) => state,

    users: (state = {
      users: [],
      user: null,
      isLoading: false,
    }) => state,

    lostFounds: (state = {
      lostFounds: [],
      lostFound: null,
      isProfile: false,
      isLoading: false,
      isLostFoundAdd: false,
      isLostFoundChange: false,
      isLostFoundChangeCover: false,
      isLostFoundDelete: false,
    }) => state,
  },
})

describe('App', () => {
  it('merender halaman homepage', async () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    )

    expect(
      await screen.findByRole('heading', {
        name: 'Lost & Founds',
        level: 2,
      }),
    ).toBeInTheDocument()
  })
})