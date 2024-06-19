import { Suspense, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import Loading from '../components/Loading'
import { useSearchData } from '../context/SearchData'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '../components/Error'
import { QueryErrorResetBoundary } from '@tanstack/react-query'

const SearchResultsPage = () => {
  const { keyword } = useParams()
  const { setKeyword } = useSearchData()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith('/search/')) {
      setKeyword(keyword)
    }
  }, [location.pathname, setKeyword, keyword])

  return (
    <div className="mx-auto mb-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Error error={error} resetErrorBoundary={resetErrorBoundary} reset={reset} />
            )}
          >
            <SearchBar />
            <Suspense fallback={<Loading />}>
              <BookList keyword={keyword} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  )
}

export default SearchResultsPage
