const SelectedBookPage = ({ data }) => {
  return (
    <div>
      <p className="font-bold text-emerald-600 text-center mb-4">書籍情報</p>
      <div className="border border-emerald-500 bg-white rounded mx-5 px-2 py-6">
        <img src={data.volumeInfo?.imageLinks?.thumbnail} className="block mx-auto mt-3" />
        <table className="mx-auto mt-4 text-left w-full">
          <tbody>
            <tr>
              <th>書名</th>
              <td>{data.volumeInfo?.title ?? '-'}</td>
            </tr>
            <tr>
              <th>著者名</th>
              <td>{data.volumeInfo?.authors.join(' / ') ?? '-'}</td>
            </tr>
            <tr>
              <th>出版社</th>
              <td>{data.volumeInfo?.publisher ?? '-'}</td>
            </tr>
            <tr>
              <th>出版日</th>
              <td>{new Date(data.volumeInfo?.publishedDate).toLocaleDateString('ja-JP') ?? '-'}</td>
            </tr>
            <tr>
              <th>価格</th>
              <td>{data.saleInfo?.listPrice?.amount ?? '-'}円</td>
            </tr>
            <tr>
              <th>利用者番号</th>
              <td>123-456-7890</td>
            </tr>
            <tr>
              <th>本日の日付</th>
              <td>{new Date().toLocaleDateString('ja-JP')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SelectedBookPage
