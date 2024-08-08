import { Link } from 'react-router-dom'
import NoImage from '@/assets/noimage.webp'
import { useSearchBooks } from '@/lib/api'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Loading from '../Loading'
import MessageShowAllItems from '@/components/MessageShowAllItems'
import { Card } from '@/components/ui/card'
import { noImageUrl } from '@/lib/constants'
import { useUserContext } from '@/context/UserContext'
import FavoriteToggleButton from './FavoriteButton'

export default function BookList(props) {
  const { ref, inView } = useInView()
  const { userId } = useUserContext()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchBooks({ keyword: props.keyword })
  const books = data.pages.flat()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  return (
    <div>
      {books?.map((book) => {
        return (
          <Card key={book.isbn} className="relative mt-4 p-4">
            <Link to={`/book/${book.isbn}`} className="flex gap-4">
              <img
                src={book.mediumImageUrl != noImageUrl ? book.mediumImageUrl : NoImage}
                width="93.5"
                height="121"
                className="self-start"
                loading="lazy"
              />
              <div>
                <h2 className="mb-1 line-clamp-2 text-base font-semibold">{book.title}</h2>
                <p className="line-clamp-1 text-sm">{book.author}</p>
              </div>
            </Link>
            {userId && <FavoriteToggleButton book={book} />}
          </Card>
        )
      })}
      <div ref={ref}>{isFetchingNextPage ? <Loading /> : !hasNextPage && <MessageShowAllItems />}</div>
    </div>
  )
}
