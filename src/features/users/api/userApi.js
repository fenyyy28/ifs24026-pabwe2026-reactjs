import {
  apiGet,
  apiPut,
  apiPost,
} from '../../../helpers/apiHelper'

export async function getUsersApi() {
  return apiGet('/users')
}

export async function getProfileApi() {
  return apiGet('/users/me')
}

export async function updateProfileApi(
  name,
  email,
) {
  return apiPut('/users/me', {
    name,
    email,
  })
}

export async function changeProfilePhotoApi(
  photo,
) {
  const formData = new FormData()

  formData.append('photo', photo)

  return apiPost(
    '/users/me/photo',
    formData,
  )
}

export async function changeProfilePasswordApi(
  password,
  newPassword,
  newPasswordConfirmation,
) {
  return apiPut('/users/password', {
    password,
    new_password: newPassword,
    new_password_confirmation:
      newPasswordConfirmation,
  })
}