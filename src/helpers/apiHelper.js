const BASE_URL =
  import.meta.env.VITE_DELCOM_BASEURL ||
  'https://open-api.delcom.org/api/v1'

export function getAccessToken() {
  return localStorage.getItem('access_token')
}

export function putAccessToken(token) {
  if (token) {
    localStorage.setItem('access_token', token)
  } else {
    localStorage.removeItem('access_token')
  }
}

export async function apiFetch(
  endpoint,
  {
    method = 'GET',
    query = {},
    body = null,
    auth = true,
    headers = {},
  } = {},
) {
  const cleanEndpoint = endpoint.replace(/^\/+/, '')
  const url = new URL(`${BASE_URL}/${cleanEndpoint}`)

  Object.entries(query).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      url.searchParams.append(key, value)
    }
  })

  const requestHeaders = {
    Accept: 'application/json',
    ...headers,
  }

  const isFormData =
    body instanceof FormData

  if (
    body !== null &&
    body !== undefined &&
    !isFormData
  ) {
    requestHeaders['Content-Type'] =
      'application/json'
  }

  if (auth) {
    const token = getAccessToken()

    if (token) {
      requestHeaders.Authorization =
        `Bearer ${token}`
    }
  }

  const response = await fetch(url.toString(), {
    method,
    headers: requestHeaders,
    body:
      body === null || body === undefined
        ? undefined
        : isFormData
          ? body
          : JSON.stringify(body),
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const errorMessage =
      data?.message ||
      data?.error ||
      `Request gagal dengan status ${response.status}`

    throw new Error(errorMessage)
  }

  return data
}

export function apiGet(
  endpoint,
  query = {},
  options = {},
) {
  return apiFetch(endpoint, {
    ...options,
    method: 'GET',
    query,
  })
}

export function apiPost(
  endpoint,
  body = {},
  options = {},
) {
  return apiFetch(endpoint, {
    ...options,
    method: 'POST',
    body,
  })
}

export function apiPut(
  endpoint,
  body = {},
  options = {},
) {
  return apiFetch(endpoint, {
    ...options,
    method: 'PUT',
    body,
  })
}

export function apiDelete(
  endpoint,
  query = {},
  options = {},
) {
  return apiFetch(endpoint, {
    ...options,
    method: 'DELETE',
    query,
  })
}