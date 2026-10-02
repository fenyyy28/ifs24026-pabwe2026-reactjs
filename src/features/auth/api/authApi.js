import { apiPost } from '../../../helpers/apiHelper'

export async function loginApi(email, password) {
  return apiPost('/auth/login', {
    email,
    password,
  }, {
    auth: false,
  })
}

export async function registerApi(name, email, password) {
  return apiPost('/auth/register', {
    name,
    email,
    password,
  }, {
    auth: false,
  })
}

export async function logoutApi() {
  return apiPost('/auth/logout')
}