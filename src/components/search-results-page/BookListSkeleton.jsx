import { Card } from '@/components/chadcn-ui/card'
import { Skeleton } from '@/components/chadcn-ui/skeleton'

const BookListSkeleton = () => {
  const BookSkelton = () => {
    return (
      <Card className="mt-4 flex gap-4 p-4">
        <Skeleton className="h-[121px] w-[93.5px] shrink-0" />
        <div className="w-full">
          <Skeleton className="mb-1 h-6 w-full" />
          <Skeleton className="h-5 w-[80%]" />
        </div>
      </Card>
    )
  }

  return (
    <div>
      <BookSkelton />
      <BookSkelton />
      <BookSkelton />
      <BookSkelton />
      <BookSkelton />
      <BookSkelton />
      <BookSkelton />
    </div>
  )
}

export default BookListSkeleton
