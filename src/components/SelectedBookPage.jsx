import NoImage from '../assets/noimage.png'

const SelectedBookPage = ({ data }) => {
  const Tr = (props) => {
    return <tr className="flex flex-col">{props.children}</tr>
  }
  const Th = (props) => {
    return (
      <td className="mx-4 mb-2 mt-6 w-fit rounded bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
        {props.children}
      </td>
    )
  }
  const Td = (props) => {
    return <td className="mx-4 text-base font-semibold">{props.children}</td>
  }

  return (
    <div>
      <p className="mb-4 text-center font-bold text-emerald-600">書籍情報</p>
      <div className="mx-5 rounded border border-emerald-500 bg-white px-2 py-6">
        <img src={data.volumeInfo?.imageLinks?.thumbnail ?? NoImage} className="mx-auto mt-3 block w-[128px]" />
        <table className="mx-auto mt-4 w-full text-left">
          <tbody>
            <Tr>
              <Th>書名</Th>
              <Td>{data.volumeInfo?.title ?? '-'}</Td>
            </Tr>
            <Tr>
              <Th>著者名</Th>
              <Td>{data.volumeInfo?.authors?.join(' / ') ?? '-'}</Td>
            </Tr>
            <Tr>
              <Th>出版社</Th>
              <Td>{data.volumeInfo?.publisher ?? '-'}</Td>
            </Tr>
            <Tr>
              <Th>出版日</Th>
              <Td>{new Date(data.volumeInfo?.publishedDate).toLocaleDateString('ja-JP') ?? '-'}</Td>
            </Tr>
            <Tr>
              <Th>価格</Th>
              <Td>{data.saleInfo?.listPrice?.amount ? `${data.saleInfo?.listPrice?.amount}円` : '-'}</Td>
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
    </div>
  )
}

export default SelectedBookPage
