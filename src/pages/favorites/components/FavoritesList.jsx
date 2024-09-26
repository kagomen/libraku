import { Card } from '@/components/shadcn-ui/card'
import { Link } from 'react-router-dom'
import NoImage from '@/assets/noimage.webp'
import { ListCheck } from 'lucide-react'
import { noImageUrl } from '@/utils/constants'
import { useEffect, useMemo } from 'react'
import { useFavoriteBooks } from '@/hooks'
import { useInView } from 'react-intersection-observer'
import Loading from '@/components/elements/Loading'
import FavoriteToggleButton from '@/components/elements/FavoriteToggleButton'
import AllDeleteButton from './AllDeleteButton'

function FavoritesList() {
  const { ref, inView } = useInView()
  const { data: favoriteBooks, isFetchingNextPage, hasNextPage, fetchNextPage } = useFavoriteBooks()
  const favorites = useMemo(() => favoriteBooks.pages.flatMap((page) => page.result), [favoriteBooks])
  const totalCount = favoriteBooks.pages[0].totalCount || 0

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  return (
    <div className="pt-12">
      <div className="flex items-center justify-between">
        <p className="ml-1.5 text-sm font-semibold">全 {totalCount} 件</p>
        <AllDeleteButton />
      </div>
      {favorites?.map((favorite) => {
        return (
          <Card className="relative mt-4 p-4" key={favorite.isbn}>
            <Link to={`/book/${favorite.isbn}`}>
              <div className="flex gap-4">
                <img
                  src={favorite.imageUrl != noImageUrl ? favorite.imageUrl : NoImage}
                  width="93.5"
                  height="121"
                  className="self-start"
                  loading="lazy"
                />
                <div>
                  <div className="min-w-0 flex-1">
                    <h2 className="mb-1 line-clamp-2 text-base font-semibold" title={favorite.title}>
                      {favorite.title}
                    </h2>
                    <p className="line-clamp-1 text-sm">{favorite.author}</p>
                  </div>
                </div>
              </div>
            </Link>
            <FavoriteToggleButton isbn={favorite.isbn} />
          </Card>
        )
      })}
      <div ref={ref} />
      {isFetchingNextPage && <Loading />}
      <div className="mx-auto mt-12 flex w-fit">
        {totalCount == 0 ? (
          <p className="mt-8 text-sm font-medium">表示するアイテムがありません</p>
        ) : (
          !hasNextPage && (
            <>
              <ListCheck size="20" className="mr-2 -translate-y-[0.5px]" />
              <p className="text-sm font-medium">すべてのアイテムを表示しました</p>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default FavoritesList
