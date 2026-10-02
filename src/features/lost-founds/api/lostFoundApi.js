import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
} from '../../../helpers/apiHelper'

export async function getLostFoundsApi(filters = {}) {
  return apiGet('/lost-founds', filters)
}

export async function getLostFoundApi(id) {
  return apiGet(`/lost-founds/${id}`)
}

export async function addLostFoundApi(title, description, status) {
  return apiPost('/lost-founds', {
    title,
    description,
    status,
  })
}

export async function changeLostFoundApi(
  id,
  title,
  description,
  status,
  isCompleted
) {
  return apiPut(`/lost-founds/${id}`, {
    title,
    description,
    status,
    is_completed: isCompleted ? 1 : 0,
  })
}

export async function changeLostFoundCoverApi(id, cover) {
  const formData = new FormData()
  formData.append('cover', cover)

  return apiPost(`/lost-founds/${id}/cover`, formData)
}

export async function deleteLostFoundApi(id) {
  return apiDelete(`/lost-founds/${id}`)
}

export async function getLostFoundStatsDailyApi() {
  return apiGet('/lost-founds/stats/daily')
}

export async function getLostFoundStatsMonthlyApi() {
  return apiGet('/lost-founds/stats/monthly')
}