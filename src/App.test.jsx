import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import App from './App'
import { renderWithProviders } from './test-utils'

describe('App', () => {
  it('merender halaman login', () => {
    renderWithProviders(<App />, {
      route: '/login',
    })

    expect(screen.getByText('Selamat datang')).toBeInTheDocument()
    expect(
      screen.getByText('Masuk ke akun Lost & Founds kamu.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument()
  })
})