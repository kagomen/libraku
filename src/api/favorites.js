import { axiosInstance } from './axiosConfig'

export async function addFavoriteBook(isbn) {
  const response = await axiosInstance.post(`/favorites/${isbn}`)
  return response.data
}

export async function removeFavoriteBook(isbn) {
  const response = await axiosInstance.delete(`/favorites/${isbn}`)
  return response.data
}

export async function deleteAllFavoriteBooks() {
  const response = await axiosInstance.delete(`/favorites/all`)
  return response.data
}
