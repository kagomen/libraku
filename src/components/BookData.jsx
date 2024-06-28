import { useSuspenseQuery } from '@tanstack/react-query'
import { get } from '../lib/api'
import NoImage from '../assets/noimage.webp'
import BackBtn from './BackBtn'

const BookData = (props) => {
  const { data } = useSuspenseQuery({
    queryKey: ['getBookData', props.isbn],
    queryFn: () => {
      return get(props.isbn)
    },
  })

  const book = data?.data?.Items[0]

  const Tr = ({ children }) => {
    return <tr className="flex flex-col">{children}</tr>
  }
  const Th = ({ children }) => {
    return (
      <td className="mx-4 mb-2 mt-6 w-fit rounded bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
        {children}
      </td>
    )
  }
  const Td = ({ children }) => {
    return <td className="mx-4 text-base font-semibold">{children}</td>
  }

  return (
    <div>
      <div className="rounded border border-emerald-500 bg-white px-2 py-6">
        <img
          src={book.Item.largeImageUrl ? book.Item.largeImageUrl : NoImage}
          width="140"
          height="200"
          className="mx-auto mt-3 block"
        />
        <table className="mx-auto mt-4 w-full text-left">
          <tbody>
            <Tr>
              <Th>書名</Th>
              <Td>{book.Item.title ? book.Item.title : '-'}</Td>
            </Tr>
            <Tr>
              <Th>著者名</Th>
              <Td>{book.Item.author ? book.Item.author : '-'}</Td>
            </Tr>
            <Tr>
              <Th>出版社</Th>
              <Td>{book.Item.publisherName ? book.Item.publisherName : '-'}</Td>
            </Tr>
            <Tr>
              <Th>出版日</Th>
              <Td>{book.Item.salesDate ? book.Item.salesDate : '-'}</Td>
            </Tr>
            <Tr>
              <Th>価格</Th>
              <Td>{book.Item.itemPrice ? `${book.Item.itemPrice}円` : '-'}</Td>
            </Tr>
            <Tr>
              <Th>ISBN</Th>
              <Td>{book.Item.isbn ? book.Item.isbn : '-'}</Td>
            </Tr>
            <Tr>
              <Th>利用者番号</Th>
              <Td>123-456-7890</Td>
            </Tr>
            <Tr>
              <Th>本日の日付</Th>
              <Td>{new Date().toLocaleDateString('ja-JP')}</Td>
            </Tr>
          </tbody>
        </table>
      </div>
      <BackBtn />
    </div>
  )
}

export default BookData
