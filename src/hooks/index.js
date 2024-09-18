import { axiosInstance } from '@/api/axiosConfig'
import { useUserContext } from '@/contexts/UserContext'
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

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

export function useUserState() {
  const { setUserId, setCardNumber } = useUserContext()
  const { isLoading, data } = useSuspenseQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await axiosInstance.post('/auth/validateSession')
      return response.data
    },
    retry: false,
  })

  useEffect(() => {
    if (!isLoading && data) {
      setUserId(data.userId)
      setCardNumber(data.cardNumber)
    } else {
      setUserId(null)
      setCardNumber(null)
    }
  }, [data, isLoading, setCardNumber, setUserId])
}
