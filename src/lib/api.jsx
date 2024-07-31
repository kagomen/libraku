import axios from 'axios'

const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL : '/api'

export async function search(keyword, pageParam) {
  const response = await axios.get(`${apiUrl}/search/${keyword}/${pageParam}`)
  if (keyword == 'error') {
    throw new Error('error check by リブラク')
  }
  return response
}

export async function get(isbn) {
  const response = await axios.get(`${apiUrl}/book/${isbn}`)
  return response
}

export async function sendMail(data, turnstileToken) {
  const turnstileResponse = await axios.post(`${apiUrl}/turnstile`, {
    token: turnstileToken,
  })

  if (turnstileResponse.status != 200) {
    throw new Error('Turnstile の検証が失敗しました')
  }

  const resendResponse = await axios.post(`${apiUrl}/send-email`, {
    name: data.name,
    email: data.email,
    body: data.body,
  })

  if (resendResponse.status != 200) {
    throw new Error('メールの送信に失敗しました')
  }
}

export async function signUp(data) {
  const response = await axios.post(`${apiUrl}/auth/signup`, {
    email: data.email,
    password: data.password,
    passwordForConfirmation: data.passwordForConfirmation,
  })

  return response
}

export async function signIn(data) {
  const response = await axios.post(`${apiUrl}/auth/signin`, {
    email: data.email,
    password: data.password,
  })

  return response
}

export async function signOut() {
  await axios.post(`${apiUrl}/auth/signout`)
}

export async function validate() {
  const response = await axios.post(`${apiUrl}/auth/validateSession`)
  return response
}
