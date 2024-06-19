import { useParams } from 'react-router-dom'
import BookData from '../components/BookData'
import { Suspense } from 'react'
import Loading from '../components/Loading'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '../components/Error'

const BookDataPage = () => {
  const { isbn } = useParams()

  return (
    <div className="mx-auto mb-8 w-[90%]">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
            <Error error={error} resetErrorBoundary={resetErrorBoundary} reset={reset} />)}>
            <Suspense fallback={<Loading />}>
              <BookData isbn={isbn} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  )
}

export default BookDataPage
