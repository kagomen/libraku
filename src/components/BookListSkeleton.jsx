import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

const BookListSkeleton = () => {

  const BookSkelton = () => {
    return (
      <Card className="mt-4 flex gap-4">
        <Skeleton className="w-[85px] h-[108px] shrink-0" />
        <div className="w-full space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[80%] h-4" />
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