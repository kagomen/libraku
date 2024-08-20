import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import BookList from '@/pages/search/components/BookList'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '@/components/elements/Error'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import BookListSkeleton from '@/pages/search/components/BookListSkeleton'

const SearchResultsPage = () => {
  const { keyword } = useParams()

  return (
    <div className="bg-background pb-11 pt-5">
      <ResponsiveWrapper>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <Error error={error} resetErrorBoundary={resetErrorBoundary} reset={reset} />
              )}
            >
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
    </div>
  )
}

export default SearchResultsPage