const SelectedBookPage = ({ data }) => {

  const Tr = (props) => {
    return (
      <tr className="flex flex-col">{props.children}</tr>
    )
  }
  const Th = (props) => {
    return (
      <td className="w-fit mx-4 mt-6 mb-2 px-2 py-1 text-xs font-medium bg-emerald-500 text-white rounded">{props.children}</td>
    )
  }
  const Td = (props) => {
    return (
      <td className="mx-4 font-semibold text-base">{props.children}</td>
    )
  }

  return (
    <div>
      <p className="font-bold text-emerald-600 text-center mb-4">書籍情報</p>
      <div className="border border-emerald-500 bg-white rounded mx-5 px-2 py-6">
        <img src={data.volumeInfo?.imageLinks?.thumbnail} className="block mx-auto mt-3" />
        <table className="mx-auto mt-4 text-left w-full">
          <tbody>
            <Tr>
              <Th>書名</Th>
              <Td>{data.volumeInfo?.title ?? '-'}</Td>
            </Tr>
            <Tr>
              <Th>著者名</Th>
              <Td>{data.volumeInfo?.authors.join(' / ') ?? '-'}</Td>
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
              <Td>{data.saleInfo?.listPrice?.amount ?? '-'}円</Td>
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
