export default function BookList({ searchedBooks, onSelect }) {
  return (
    <div className="w-[90%] mx-auto">
      <p>検索結果 :</p>
      {searchedBooks.map((book) => {
        return (
          <div key={book.id} onClick={() => onSelect(book)} className="flex gap-4 mt-4 p-4 border rounded border-emerald-500 bg-white">
            <img src={book.volumeInfo?.imageLinks?.thumbnail} className="w-[85px]" />
            <div>
              <h2 className="text-sm font-semibold mb-1">{book.volumeInfo?.title}</h2>
              <p className="text-xs">{book.volumeInfo?.authors?.join(' / ')}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
