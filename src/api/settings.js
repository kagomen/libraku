import { axiosInstance } from './axiosConfig'

export async function registerCardNumber(data) {
  await axiosInstance.post('/settings/cardNumber', {
    cardNumber: data.cardNumber,
  })
}

export async function updateCardNumber(data) {
  await axiosInstance.put('/settings/cardNumber', {
    cardNumber: data.cardNumber,
  })
}

export async function changePassword(data) {
  const response = await axiosInstance.put('/settings/password', {
    password: data.password,
    newPassword: data.newPassword,
    newPasswordForConfirmation: data.newPasswordForConfirmation,
  })

  return response.data
}

export async function changeEmail(data) {
  const response = await axiosInstance.post('/settings/request-email-change', {
    newEmail: data.newEmail,
    newEmailForConfirmation: data.newEmailForConfirmation,
  })

  return response.data
}

export async function verifyCodeForChangeEmail(data) {
  const response = await axiosInstance.post('/settings/email-verification', {
    code: data.code,
  })

  return response.data
}
