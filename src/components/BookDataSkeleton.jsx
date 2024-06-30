import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

const BookDataSkeleton = () => {
  return (
    <Card>
      <Skeleton className="w-[140px] h-[200px] mx-auto my-4 block" />
      <div className="mx-auto mt-10 w-full text-left">
        <CardContent>
          <CardTitle>書名</CardTitle>
          <CardDescription>
            <Skeleton className="w-full h-6" />
          </CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>著者名</CardTitle>
          <CardDescription>
            <Skeleton className="w-full h-6" />
          </CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>出版社</CardTitle>
          <CardDescription>
            <Skeleton className="w-full h-6" />
          </CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>出版日</CardTitle>
          <CardDescription>
            <Skeleton className="w-full h-6" />
          </CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>価格</CardTitle>
          <CardDescription>
            <Skeleton className="w-full h-6" />
          </CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>ISBN</CardTitle>
          <CardDescription>
            <Skeleton className="w-full h-6" />
          </CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>利用者番号</CardTitle>
          <CardDescription>123-456-7890</CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>本日の日付</CardTitle>
          <CardDescription className="border-b-0">{new Date().toLocaleDateString('ja-JP')}</CardDescription>
        </CardContent>
      </div>
    </Card>
  )
}

export default BookDataSkeleton