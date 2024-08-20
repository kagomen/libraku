import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export function useSearchBooks({ keyword }) {
  return useSuspenseInfiniteQuery({
    queryKey: ['searchBooks', keyword],
    queryFn: async ({ pageParam }) => {
      const response = await instance.get(`/search/${keyword}/${pageParam}`)
      const books = response.data.Items.flatMap((item) => item.Item)
      return books
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return lastPage.length === 0 ? undefined : nextPage
    },
  })
}

export function useBookData(isbn) {
  return useSuspenseQuery({
    queryKey: ['getBookData', isbn],
    queryFn: async () => {
      const response = await instance.get(`/book/${isbn}`)
      return response.data.Items[0].Item
    },
  })
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

  return response.data
}
export async function verifyCodeForSignUp(data) {
  const response = await instance.post('/auth/email-verification', {
    code: data.code,
  })

  return response.data
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

export function useUserInfo() {
  return useSuspenseQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await instance.post('/auth/validateSession')
      return response.data
    },
    retry: false,
  })
}

// ------------- ユーザー設定関係 --------------------

export async function registerCardNumber(data) {
  const response = await instance.post('/settings/cardNumber', {
    cardNumber: data.cardNumber,
  })

  return response
}

export async function getCardNumber() {
  const response = await instance.get('/settings/cardNumber')
  return response.data
}

export async function updateCardNumber(data) {
  const response = await instance.put('/settings/cardNumber', {
    cardNumber: data.cardNumber,
  })

  return response
}

export async function changePassword(data) {
  const response = await instance.put('/settings/password', {
    password: data.password,
    newPassword: data.newPassword,
    newPasswordForConfirmation: data.newPasswordForConfirmation,
  })

  return response.data
}

export async function changeEmail(data) {
  const response = await instance.post('/settings/request-email-change', {
    newEmail: data.newEmail,
    newEmailForConfirmation: data.newEmailForConfirmation,
  })

  return response.data
}

export async function verifyCodeForChangeEmail(data) {
  const response = await instance.post('/settings/email-verification', {
    code: data.code,
  })

  return response.data
}

// -------------- お気に入り機能関係 ------------------

export function useFavoriteBooks() {
  return useSuspenseQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await instance.get('/favorites')
      return response.data
    },
  })
}

export async function addFavoriteBook(isbn) {
  const response = await instance.post(`/favorites/${isbn}`)
  return response.data
}

export async function removeFavoriteBook(isbn) {
  const response = await instance.delete(`/favorites/${isbn}`)
  return response.data
}

export async function deleteAllFavoriteBooks() {
  const response = await instance.delete(`/favorites/all`)
  return response.data
}

export function useFavoriteIsbnList() {
  return useSuspenseQuery({
    queryKey: ['favoriteIsbnList'],
    queryFn: async () => {
      const response = await instance.get('/favorites/isbn-list')
      return response.data
    },
  })
}
