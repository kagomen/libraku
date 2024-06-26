import { Suspense, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import { useSearchData } from '../context/SearchData'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '../components/Error'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import BookListSkeleton from '@/components/BookListSkeleton'

const SearchResultsPage = () => {
  const { keyword } = useParams()
  const { setKeyword } = useSearchData()
  const location = useLocation()

  // トップページから戻ってきた時に、空になった入力欄にキーワードを再度表示させる
  useEffect(() => {
    if (location.pathname.startsWith('/search/')) {
      setKeyword(keyword)
    }
  }, [location.pathname, setKeyword, keyword])

  return (
    <ResponsiveWrapper>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Error error={error} resetErrorBoundary={resetErrorBoundary} reset={reset} />
            )}
          >
            <SearchBar />
            <p className="text-sm">
              &quot;
              <span className="font-medium">{keyword}</span>
              &quot;の検索結果：
            </p>
            <Suspense fallback={<BookListSkeleton />}>
              <BookList keyword={keyword} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </ResponsiveWrapper>
  )
}

export default SearchResultsPage
