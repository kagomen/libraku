import { axiosInstance } from '@/api/axiosConfig'
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useSearchBooks({ keyword }) {
  return useSuspenseInfiniteQuery({
    queryKey: ['searchBooks', keyword],
    queryFn: async ({ pageParam }) => {
      const response = await axiosInstance.get(`/search/${keyword}/${pageParam}`)
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
      const response = await axiosInstance.get(`/book/${isbn}`)
      return response.data
    },
  })
}

export function useUserInfo() {
  return useSuspenseQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await axiosInstance.post('/auth/validateSession')
      return response.data
    },
    retry: false,
  })
}

export function useFavoriteBooks() {
  return useSuspenseQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await axiosInstance.get('/favorites')
      return response.data
    },
  })
}

export function useFavoriteIsbnList() {
  return useSuspenseQuery({
    queryKey: ['favoriteIsbnList'],
    queryFn: async () => {
      const response = await axiosInstance.get('/favorites/isbn-list')
      return response.data
    },
  })
}
