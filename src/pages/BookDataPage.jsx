import { useNavigate, useParams } from 'react-router-dom'
import BookData from '../components/BookData'
import { Suspense } from 'react'
import Loading from '../components/Loading'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '../components/Error'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import Heading from '@/components/Heading'
import { BookOpenText } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BookDataPage = () => {
  const { isbn } = useParams()
  const nav = useNavigate()

  return (
    <ResponsiveWrapper>
      <Heading>
        <BookOpenText size="22" />
        書籍情報
      </Heading>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Error error={error} resetErrorBoundary={resetErrorBoundary} reset={reset} />
            )}
          >
            <Suspense fallback={<Loading />}>
              <BookData isbn={isbn} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <Button onClick={() => nav(-1)}>もどる</Button>
    </ResponsiveWrapper>
  )
}

export default BookDataPage
