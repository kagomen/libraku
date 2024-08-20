import { axiosInstance } from './axiosConfig'

export async function sendMail(data, turnstileToken) {
  const turnstileResponse = await axiosInstance.post('/turnstile', {
    token: turnstileToken,
  })

  if (turnstileResponse.status != 200) {
    throw new Error('Turnstile の検証が失敗しました')
  }

  const resendResponse = await axiosInstance.post('/send-email', {
    name: data.name,
    email: data.email,
    body: data.body,
  })

  if (resendResponse.status != 200) {
    throw new Error('メールの送信に失敗しました')
  }
}
