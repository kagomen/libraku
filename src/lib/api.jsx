import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export async function search(keyword, pageParam) {
  const response = await instance.get(`/search/${keyword}/${pageParam}`)
  if (keyword == 'error') {
    throw new Error('error check by リブラク')
  }
  return response
}

export async function get(isbn) {
  const response = await instance.get(`/book/${isbn}`)
  return response
}

export async function sendMail(data, turnstileToken) {
  const turnstileResponse = await instance.post('/turnstile', {
    token: turnstileToken,
  })

  if (turnstileResponse.status != 200) {
    throw new Error('Turnstile の検証が失敗しました')
  }

  const resendResponse = await instance.post('/send-email', {
    name: data.name,
    email: data.email,
    body: data.body,
  })

  if (resendResponse.status != 200) {
    throw new Error('メールの送信に失敗しました')
  }
}

export async function signUp(data) {
  const response = await instance.post('/auth/signup', {
    email: data.email,
    password: data.password,
    passwordForConfirmation: data.passwordForConfirmation,
  })

  return response
}

export async function signIn(data) {
  const response = await instance.post('/auth/signin', {
    email: data.email,
    password: data.password,
  })

  return response
}

export async function signOut() {
  await instance.post('/auth/signout')
}

export async function validate() {
  const response = await instance.post('/auth/validateSession')
  return response
}

export async function registerCardNumber(data) {
  const response = await instance.post('/settings/cardNumber', {
    cardNumber: data.cardNumber,
  })

  return response
}

export async function getCardNumber() {
  const response = await instance.get('/settings/cardNumber')
  return response
}

export async function updateCardNumber(data) {
  const response = await instance.put('/settings/cardNumber', {
    cardNumber: data.cardNumber,
  })

  return response
}
