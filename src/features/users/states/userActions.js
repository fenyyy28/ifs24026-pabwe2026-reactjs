export const GET_USERS =
  'users/getUsers'

export const GET_PROFILE =
  'users/getProfile'

export const CHANGE_PROFILE =
  'users/changeProfile'

export const CHANGE_PROFILE_PHOTO =
  'users/changeProfilePhoto'

export const CHANGE_PROFILE_PASSWORD =
  'users/changeProfilePassword'

export const getUsersAction = (payload) => ({
  type: GET_USERS,
  payload,
})

export const getProfileAction = (payload) => ({
  type: GET_PROFILE,
  payload,
})

export const changeProfileAction = (payload) => ({
  type: CHANGE_PROFILE,
  payload,
})

export const changeProfilePhotoAction =
  (payload) => ({
    type: CHANGE_PROFILE_PHOTO,
    payload,
  })

export const changeProfilePasswordAction =
  (payload) => ({
    type: CHANGE_PROFILE_PASSWORD,
    payload,
  })