import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/states/authSlice'
import userReducer from './features/users/states/userSlice'
import lostFoundReducer from './features/lost-founds/states/lostFoundSlice'

export function renderWithProviders(
  ui,
  {
    route = '/',
    preloadedState,
    ...renderOptions
  } = {},
) {
  const testStore = configureStore({
    reducer: {
      auth: authReducer,
      users: userReducer,
      lostFounds: lostFoundReducer,
    },
    preloadedState,
  })

  return {
    store: testStore,
    ...render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
      </Provider>,
      renderOptions,
    ),
  }
}