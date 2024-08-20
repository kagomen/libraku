import { axiosInstance } from './axiosConfig'

export async function signUp(data) {
  const response = await axiosInstance.post('/auth/signup', {
    email: data.email,
    password: data.password,
    passwordForConfirmation: data.passwordForConfirmation,
  })

  return response.data
}

export async function verifyCodeForSignUp(data) {
  const response = await axiosInstance.post('/auth/email-verification', {
    code: data.code,
  })

  return response.data
}

export async function signIn(data) {
  const response = await axiosInstance.post('/auth/signin', {
    email: data.email,
    password: data.password,
  })

  return response.data
}

export async function signOut() {
  await axiosInstance.post('/auth/signout')
}
