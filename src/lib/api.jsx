import axios from 'axios'

export async function search(keyword, pageParam) {
  const res = await axios.get(`/api/search/${keyword}/${pageParam}`)
  if (keyword == 'error') {
    throw new Error('error check by リブラク')
  }
  return res
}

export async function get(isbn) {
  const res = await axios.get(`/api/book/${isbn}`)
  return res
}

export async function sendMail(data, turnstileToken) {
  const turnstileResponse = await axios.post(`/api/turnstile`, {
    token: turnstileToken,
  })

  if (turnstileResponse.status != 200) {
    throw new Error('Turnstile の検証が失敗しました')
  }

  const resendResponse = await axios.post(`/api/send-email`, {
    name: data.name,
    email: data.email,
    body: data.body,
  })

  if (resendResponse.status != 200) {
    throw new Error('メールの送信に失敗しました')
  }
}

export async function signUp(data) {
  const signUpResponse = await axios.post(`/api/auth/signup`, {
    email: data.email,
    password: data.password,
    passwordForConfirmation: data.passwordForConfirmation,
  })

  if (signUpResponse.status != 200) {
    throw new Error('ユーザー登録に失敗しました')
  }
}
