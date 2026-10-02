export const GET_LOST_FOUNDS = 'lostFounds/getLostFounds'
export const GET_LOST_FOUND = 'lostFounds/getLostFound'
export const ADD_LOST_FOUND = 'lostFounds/addLostFound'
export const CHANGE_LOST_FOUND = 'lostFounds/changeLostFound'
export const CHANGE_LOST_FOUND_COVER = 'lostFounds/changeLostFoundCover'
export const DELETE_LOST_FOUND = 'lostFounds/deleteLostFound'
export const GET_LOST_FOUND_STATS = 'lostFounds/getLostFoundStats'

export const getLostFoundsAction = (filters = {}) => ({
  type: GET_LOST_FOUNDS,
  payload: filters,
})

export const getLostFoundAction = (id) => ({
  type: GET_LOST_FOUND,
  payload: id,
})

export const addLostFoundAction = (data) => ({
  type: ADD_LOST_FOUND,
  payload: data,
})

export const changeLostFoundAction = (data) => ({
  type: CHANGE_LOST_FOUND,
  payload: data,
})

export const changeLostFoundCoverAction = (data) => ({
  type: CHANGE_LOST_FOUND_COVER,
  payload: data,
})

export const deleteLostFoundAction = (id) => ({
  type: DELETE_LOST_FOUND,
  payload: id,
})

export const getLostFoundStatsAction = () => ({
  type: GET_LOST_FOUND_STATS,
})