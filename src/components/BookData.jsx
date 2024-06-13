import NoImage from '../assets/noimage.webp'
import BackBtn from './BackBtn'

const BookData = (props) => {
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
      <p className="mb-4 text-center font-bold text-emerald-600">書籍情報</p>
      <div className="rounded border border-emerald-500 bg-white px-2 py-6">
        <img
          src={props.book?.Item.largeImageUrl ? props.book?.Item.largeImageUrl : NoImage}
          width="160"
          className="mx-auto mt-3 block"
        />
        <table className="mx-auto mt-4 w-full text-left">
          <tbody>
            <Tr>
              <Th>書名</Th>
              <Td>{props.book?.Item.title ? props.book?.Item.title : '-'}</Td>
            </Tr>
            <Tr>
              <Th>著者名</Th>
              <Td>{props.book?.Item.author ? props.book?.Item.author : '-'}</Td>
            </Tr>
            <Tr>
              <Th>出版社</Th>
              <Td>{props.book?.Item.publisherName ? props.book?.Item.publisherName : '-'}</Td>
            </Tr>
            <Tr>
              <Th>出版日</Th>
              <Td>{props.book?.Item.salesDate ? props.book?.Item.salesDate : '-'}</Td>
            </Tr>
            <Tr>
              <Th>価格</Th>
              <Td>{props.book?.Item.itemPrice ? `${props.book.Item.itemPrice}円` : '-'}</Td>
            </Tr>
            <Tr>
              <Th>ISBN</Th>
              <Td>{props.book?.Item.isbn ? props.book?.Item.isbn : '-'}</Td>
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
