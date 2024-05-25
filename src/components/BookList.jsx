export default function BookList({ searchedBooks, onSelect }) {
  return (
    <div className="mx-auto w-[90%]">
      <p>検索結果 :</p>
      {searchedBooks.map((book) => {
        return (
          <div
            key={book.id}
            onClick={() => onSelect(book)}
            className="mt-4 flex gap-4 rounded border border-emerald-500 bg-white p-4"
          >
            <img src={book.volumeInfo?.imageLinks?.thumbnail} className="w-[85px]" />
            <div>
              <h2 className="mb-1 text-sm font-semibold">{book.volumeInfo?.title}</h2>
              <p className="text-xs">{book.volumeInfo?.authors?.join(' / ')}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
