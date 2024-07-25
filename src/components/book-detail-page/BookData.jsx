import { useSuspenseQuery } from '@tanstack/react-query'
import { get } from '@/lib/api'
import NoImage from '@/assets/noimage.webp'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Title from './Title'
import Content from './Content'
import { ExternalLink, Heart } from 'lucide-react'

const BookData = (props) => {
  const { data } = useSuspenseQuery({
    queryKey: ['getBookData', props.isbn],
    queryFn: () => {
      return get(props.isbn)
    },
  })

  const book = data?.data?.Items[0]

  return (
    <Card className="space-y-11 py-11">
      <img
        src={book.Item.largeImageUrl ? book.Item.largeImageUrl : NoImage}
        width="140"
        height="200"
        className="mx-auto block h-[200px] w-[140px] object-contain"
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" className="relative w-full">
          <ExternalLink size="14" className="mr-1.5" />
          Amazonで見る
        </Button>
        <Button size="sm" className="relative w-full">
          <Heart size="14" className="mr-1.5" />
          お気に入りに追加
        </Button>
      </div>
      <div className="mx-auto mt-10 w-full space-y-6 text-left">
        <div>
          <Title>書名</Title>
          <Content>{book.Item.title ? book.Item.title : '-'}</Content>
        </div>
        <div>
          <Title>著者名</Title>
          <Content>{book.Item.author ? book.Item.author : '-'}</Content>
        </div>
        <div>
          <Title>出版社</Title>
          <Content>{book.Item.publisherName ? book.Item.publisherName : '-'}</Content>
        </div>
        <div>
          <Title>出版日</Title>
          <Content>{book.Item.salesDate ? book.Item.salesDate : '-'}</Content>
        </div>
        <div>
          <Title>価格</Title>
          <Content>{book.Item.itemPrice ? `${book.Item.itemPrice}円` : '-'}</Content>
        </div>
        <div>
          <Title>ISBN</Title>
          <Content>{book.Item.isbn ? book.Item.isbn : '-'}</Content>
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

export default BookData