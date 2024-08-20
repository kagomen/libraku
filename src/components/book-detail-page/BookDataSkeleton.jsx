import { Card } from '@/components/chadcn-ui/card'
import { Skeleton } from '@/components/chadcn-ui/skeleton'
import Title from './Title'
import Content from './Content'

const BookDataSkeleton = () => {
  return (
    <Card className="space-y-11 py-11">
      <Skeleton className="mx-auto h-[200px] w-[140px]" />
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="mx-auto mt-10 w-full space-y-6 text-left">
        <div>
          <Title>書名</Title>
          <Content>
            <Skeleton className="h-7 w-full" />
          </Content>
        </div>
        <div>
          <Title>著者名</Title>
          <Content>
            <Skeleton className="h-7 w-full" />
          </Content>
        </div>
        <div>
          <Title>出版社</Title>
          <Content>
            <Skeleton className="h-6 w-full" />
          </Content>
        </div>
        <div>
          <Title>出版日</Title>
          <Content>
            <Skeleton className="h-6 w-full" />
          </Content>
        </div>
        <div>
          <Title>価格</Title>
          <Content>
            <Skeleton className="h-6 w-full" />
          </Content>
        </div>
        <div>
          <Title>ISBN</Title>
          <Content>
            <Skeleton className="h-6 w-full" />
          </Content>
        </div>
        <div>
          <Title>利用者番号</Title>
          <Content>123-456-7890</Content>
        </div>
        <div>
          <Title>本日の日付</Title>
          <Content className="border-b-0">{new Date().toLocaleDateString('ja-JP')}</Content>
        </div>
      </div>
    </Card>

    // <Card>
    //   <Skeleton className="mx-auto my-4 block h-[200px] w-[140px]" />
    //   <div className="mx-auto mt-10 w-full text-left">
    //     <CardContent>
    //       <CardTitle>書名</CardTitle>
    //       <CardDescription>
    //         <Skeleton className="h-6 w-full" />
    //       </CardDescription>
    //     </CardContent>
    //     <CardContent>
    //       <CardTitle>著者名</CardTitle>
    //       <CardDescription>
    //         <Skeleton className="h-6 w-full" />
    //       </CardDescription>
    //     </CardContent>
    //     <CardContent>
    //       <CardTitle>出版社</CardTitle>
    //       <CardDescription>
    //         <Skeleton className="h-6 w-full" />
    //       </CardDescription>
    //     </CardContent>
    //     <CardContent>
    //       <CardTitle>出版日</CardTitle>
    //       <CardDescription>
    //         <Skeleton className="h-6 w-full" />
    //       </CardDescription>
    //     </CardContent>
    //     <CardContent>
    //       <CardTitle>価格</CardTitle>
    //       <CardDescription>
    //         <Skeleton className="h-6 w-full" />
    //       </CardDescription>
    //     </CardContent>
    //     <CardContent>
    //       <CardTitle>ISBN</CardTitle>
    //       <CardDescription>
    //         <Skeleton className="h-6 w-full" />
    //       </CardDescription>
    //     </CardContent>
    //     <CardContent>
    //       <CardTitle>利用者番号</CardTitle>
    //       <CardDescription>123-456-7890</CardDescription>
    //     </CardContent>
    //     <CardContent>
    //       <CardTitle>本日の日付</CardTitle>
    //       <CardDescription className="border-b-0">{new Date().toLocaleDateString('ja-JP')}</CardDescription>
    //     </CardContent>
    //   </div>
    // </Card>
  )
}

export default BookDataSkeleton
