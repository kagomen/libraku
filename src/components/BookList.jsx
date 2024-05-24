export default function BookList({ searchedBooks, selectBook }) {
  return (
    <div>
      {searchedBooks.map((book) => {
        return (
          <div key={book.id} onClick={() => selectBook(book)}>
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors}</p>
            <img src={book.volumeInfo.imageLinks.thumbnail} />
          </div>
        )
      })}
    </div>
  )
}
