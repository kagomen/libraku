import { addFavoriteBook, deleteAllFavoriteBooks, removeFavoriteBook, useFavoriteBooks } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import NoImage from '@/assets/noimage.webp'
import MessageShowAllItems from '../MessageShowAllItems'
import { Button } from '../ui/button'
import { Heart, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { noImageUrl } from '@/lib/constants'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogContent } from '../ui/dialog'

function FavoritesList() {
  const { data: favorites } = useFavoriteBooks()
  const [favoritesStatus, setFavoritesStatus] = useState(() => {
    const initialStatus = {}
    favorites?.forEach((favorite) => {
      initialStatus[favorite.isbn] = true
    })
    return initialStatus
  })

  async function toggleFavoriteHandler(isbn) {
    try {
      if (favoritesStatus[isbn]) {
        await removeFavoriteBook(isbn)
      } else {
        await addFavoriteBook(isbn)
      }
      setFavoritesStatus((prev) => ({ ...prev, [isbn]: !prev[isbn] }))
    } catch (e) {
      toast.error('エラーが発生しました')
    }
  }

  return (
    <div className="pt-12">
      <div className="flex items-center justify-between">
        <p className="ml-1.5 text-sm font-semibold">全 {favorites.length} 件</p>
        <Dialog>
          <DialogTrigger>
            <Button size="sm">
              <Trash2 size="16" className="mr-2" />
              一括削除
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Button onClick={deleteAllFavoriteBooks}>全件削除する</Button>
          </DialogContent>
        </Dialog>
      </div>
      {favorites?.map((favorite) => {
        const isFavorite = favoritesStatus[favorite.isbn]
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
            <Button
              variant="ghost"
              className="absolute bottom-2 right-3 p-0"
              onClick={() => toggleFavoriteHandler(favorite.isbn)}
            >
              <div className={`${isFavorite ? 'bg-primary' : 'bg-border'} w-fit rounded-full p-1.5 text-white`}>
                <Heart size="18" />
              </div>
            </Button>
          </Card>
        )
      })}
      <MessageShowAllItems />
    </div>
  )
}

export default FavoritesList
