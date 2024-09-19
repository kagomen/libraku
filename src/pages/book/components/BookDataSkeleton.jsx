import { Card } from '@/components/shadcn-ui/card'
import { Skeleton } from '@/components/shadcn-ui/skeleton'
import Title from './Title'
import Content from './Content'

const BookDataSkeleton = () => {
  return (
    <Card className="space-y-11 py-11">
      <Skeleton className="mx-auto h-[200px] w-[140px]" />
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
  )
}

export default BookDataSkeleton
