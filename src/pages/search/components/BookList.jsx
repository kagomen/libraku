import { Link } from 'react-router-dom'
import NoImage from '@/assets/noimage.webp'
import { useSearchBooks } from '@/hooks'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Loading from '@/components/elements/Loading'
import MessageShowAllItems from '@/components/elements/MessageShowAllItems'
import { Card } from '@/components/shadcn-ui/card'
import { noImageUrl } from '@/utils/constants'
import { useUserContext } from '@/contexts/UserContext'
import FavoriteToggleButton from './FavoriteButton'
import DialogForNonRegisteredUser from '@/components/elements/DialogForNonRegisteredUser'
import { Button } from '@/components/shadcn-ui/button'
import { Heart } from 'lucide-react'
import { DialogTrigger } from '@/components/shadcn-ui/dialog'

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
            {userId ? (
              <FavoriteToggleButton book={book} />
            ) : (
              <DialogForNonRegisteredUser>
                <Button asChild variant="ghost" className="absolute bottom-2 right-3 p-0">
                  <DialogTrigger>
                    <div className="w-fit rounded-full bg-border  p-2 text-white">
                      <Heart size="18" />
                    </div>
                  </DialogTrigger>
                </Button>
              </DialogForNonRegisteredUser>
            )}
          </Card>
        )
      })}
      <div ref={ref}>{isFetchingNextPage ? <Loading /> : !hasNextPage && <MessageShowAllItems />}</div>
    </div>
  )
}
