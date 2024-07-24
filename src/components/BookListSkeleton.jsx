import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'

const BookListSkeleton = () => {
  const BookSkelton = () => {
    return (
      <Card className="mt-4 flex gap-4 p-4">
        <Skeleton className="h-[121px] w-[93.5px] shrink-0" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
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
