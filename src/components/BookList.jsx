import { Link } from 'react-router-dom'
import NoImage from '../assets/noimage.webp'

export default function BookList(props) {
  return (
    <div>
      <p className="text-sm">
        &quot;
        <span className="font-semibold">{props.keyword}</span>
        &quot;の検索結果：
      </p>
      {props.books?.map((book) => {
        return (
          <Link to={`/book/${book.Item.isbn}`} key={book.Item.isbn}>
            <div className="mt-4 flex items-start gap-4 rounded border border-emerald-500 bg-white p-4">
              <img src={book.Item.mediumImageUrl ?? NoImage} width="85" className='shrink-0' />
              <div>
                <h2 className="mb-1 text-sm font-semibold">{book.Item.title}</h2>
                <p className="text-xs">{book.Item.author}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
