import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT } from './authTypes'

export const authLoginAction = (payload) => ({
  type: AUTH_LOGIN,
  payload,
})

export const authRegisterAction = (payload) => ({
  type: AUTH_REGISTER,
  payload,
})

export const authLogoutAction = () => ({
  type: AUTH_LOGOUT,
})