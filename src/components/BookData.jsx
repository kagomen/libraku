import { useSuspenseQuery } from '@tanstack/react-query'
import { get } from '../lib/api'
import NoImage from '../assets/noimage.webp'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'

const BookData = (props) => {
  const { data } = useSuspenseQuery({
    queryKey: ['getBookData', props.isbn],
    queryFn: () => {
      return get(props.isbn)
    },
  })

  const book = data?.data?.Items[0]

  return (
    <Card>
      <img
        src={book.Item.largeImageUrl ? book.Item.largeImageUrl : NoImage}
        width="140"
        height="200"
        className="mx-auto my-4 block"
      />
      <div className="mx-auto mt-10 w-full text-left">
        <CardContent>
          <CardTitle>書名</CardTitle>
          <CardDescription>{book.Item.title ? book.Item.title : '-'}</CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>著者名</CardTitle>
          <CardDescription>{book.Item.author ? book.Item.author : '-'}</CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>出版社</CardTitle>
          <CardDescription>{book.Item.publisherName ? book.Item.publisherName : '-'}</CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>出版日</CardTitle>
          <CardDescription>{book.Item.salesDate ? book.Item.salesDate : '-'}</CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>価格</CardTitle>
          <CardDescription>{book.Item.itemPrice ? `${book.Item.itemPrice}円` : '-'}</CardDescription>
        </CardContent>
        <CardContent>
          <CardTitle>ISBN</CardTitle>
          <CardDescription>{book.Item.isbn ? book.Item.isbn : '-'}</CardDescription>
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

export default BookData
