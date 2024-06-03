import { Link } from 'react-router-dom'
import NoImage from '../assets/noimage.webp'

export default function BookList(props) {
  return (
    <div>
      {props.books?.map((book) => {
        return (
          <Link to={`/book/${book.id}`} key={book.id}>
            <div
              className="mt-4 flex gap-4 rounded border border-emerald-500 bg-white p-4"
            >
              <img src={book.volumeInfo?.imageLinks?.thumbnail ?? NoImage} width="85" height="109.62" />
              <div>
                <h2 className="mb-1 text-sm font-semibold">{book.volumeInfo?.title}</h2>
                <p className="text-xs">{book.volumeInfo?.authors?.join(' / ')}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
