import { useNavigate, useParams } from 'react-router-dom'
import BookData from '@/pages/book/components/BookData'
import { Suspense } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '@/components/elements/Error'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/chadcn-ui/button'
import BookDataSkeleton from '@/pages/book/components/BookDataSkeleton'
import ButtonIconWrapper from '@/components/elements/ButtonIconWrapper'

const BookDataPage = () => {
  const { isbn } = useParams()
  const nav = useNavigate()

  return (
    <div className="bg-background py-10">
      <ResponsiveWrapper>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <Error error={error} resetErrorBoundary={resetErrorBoundary} reset={reset} />
              )}
            >
              <Suspense fallback={<BookDataSkeleton />}>
                <BookData isbn={isbn} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <Button onClick={() => nav(-1)} variant="outline" className="relative mx-auto mt-8 w-full">
          <ButtonIconWrapper side="left">
            <ChevronLeft />
          </ButtonIconWrapper>
          戻る
        </Button>
      </ResponsiveWrapper>
    </div>
  )
}

export default BookDataPage