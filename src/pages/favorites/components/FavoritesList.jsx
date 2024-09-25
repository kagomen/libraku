import { deleteAllFavoriteBooks } from '@/api'
import { Card } from '@/components/shadcn-ui/card'
import { Link } from 'react-router-dom'
import NoImage from '@/assets/noimage.webp'
import MessageShowAllItems from '@/components/elements/MessageShowAllItems'
import { Button } from '@/components/shadcn-ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { noImageUrl } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogContent } from '@/components/shadcn-ui/dialog'
import src from '@/assets/rabbit-emoji/emoji_u1f407.svg'
import { useFavoriteBooks, useFavoriteIsbnList } from '@/hooks'
import { useInView } from 'react-intersection-observer'
import Loading from '@/components/elements/Loading'
import FavoriteToggleButton from '@/components/elements/FavoriteToggleButton'

function FavoritesList() {
  const { ref, inView } = useInView()

  const { data: favoriteIsbnList, refetch: favoriteIsbnListRefetch } = useFavoriteIsbnList()
  const {
    data: favoriteBooks,
    refetch: favoriteBooksRefetch,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useFavoriteBooks()
  const favorites = favoriteBooks.pages.flatMap((page) => page.result)
  const totalCount = favoriteBooks.pages[0].totalCount || 0

  // Dialogの開閉を管理するstate
  const [isOpen, setIsOpen] = useState(false)
  async function deleteAllFavoriteBooksHandler() {
    try {
      await deleteAllFavoriteBooks()
      favoriteBooksRefetch()
      favoriteIsbnListRefetch()
      setIsOpen(false)
      toast.success('削除しました')
    } catch (e) {
      toast.error('エラーが発生しました')
    }
  }

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  return (
    <div className="pt-12">
      <div className="flex items-center justify-between">
        <p className="ml-1.5 text-sm font-semibold">全 {totalCount} 件</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => setIsOpen(true)} disabled={favoriteIsbnList.length == 0}>
              <Trash2 size="16" className="mr-2" />
              全件削除
            </Button>
          </DialogTrigger>
          <DialogContent>
            <img src={src} alt="" width="72" height="72" className="mx-auto" />
            <p className="text-center">すべて削除しますか？</p>
            <Button onClick={deleteAllFavoriteBooksHandler}>削除する</Button>
          </DialogContent>
        </Dialog>
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
      {favoriteIsbnList.length == 0 ? (
        <MessageShowAllItems variant="nothing" />
      ) : (
        <div ref={ref}>{isFetchingNextPage ? <Loading /> : !hasNextPage && <MessageShowAllItems />}</div>
      )}
    </div>
  )
}

export default FavoritesList
