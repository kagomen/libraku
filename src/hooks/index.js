import { axiosInstance } from '@/api/axiosConfig'
import { useUserContext } from '@/contexts/UserContext'
import { TEST_ACCOUNT_EMAIL } from '@/utils/constants'
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
    staleTime: 12 * 60 * 60 * 1000, // 12時間（バックグランドで取得）
    gcTime: 12 * 60 * 60 * 1000, // 24時間（古いキャッシュ）
    initialPageParam: 1,
    // lastPage: [Array(30)] ~[Array(1)], or [] <- lastPage.length === 0
    // allPages: [Array(30), Array(30), Array(10)]
    getNextPageParam: (lastPage, allPages) => {
      // console.log('lastPage', lastPage)
      // console.log('allPages', allPages)
      const nextPage = allPages.length + 1
      return lastPage.length === 0 ? undefined : nextPage // undefinedを返せば、hasNextPageの値がfalseになる
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
    refetchOnWindowFocus: false,
    staleTime: 12 * 60 * 60 * 1000, // 12時間
    gcTime: 12 * 60 * 60 * 1000, // 24時間
  })
}

export function useFavoriteBooks() {
  return useSuspenseInfiniteQuery({
    queryKey: ['favorites'],
    queryFn: async ({ pageParam }) => {
      const response = await axiosInstance.get(`/favorites/${pageParam}`)
      return response.data
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage', lastPage)
      console.log('allPages', allPages)
      const nextPage = allPages.length + 1
      return lastPage.result.length === 0 ? undefined : nextPage
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
    refetchOnWindowFocus: false,
  })
}

export function useUserState() {
  const { setUserId, setEmail, setCardNumber, setIsTestAccount } = useUserContext()
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
      if (data.email == TEST_ACCOUNT_EMAIL) {
        setIsTestAccount(true)
      }
      setUserId(data.userId)
      setEmail(data.email)
      setCardNumber(data.cardNumber)
    } else {
      setUserId(null)
    }
  }, [data, isLoading, setCardNumber, setEmail, setIsTestAccount, setUserId])
}
