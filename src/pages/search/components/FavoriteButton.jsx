import { addFavoriteBook, removeFavoriteBook } from '@/api'
import { Button } from '@/components/shadcn-ui/button'
import { toast } from 'sonner'
import { Heart } from 'lucide-react'
import { useFavoriteIsbnList } from '@/hooks'

function FavoriteToggleButton(props) {
  const { data: favoriteIsbnList, refetch } = useFavoriteIsbnList()
  const isFavorite = favoriteIsbnList?.includes(props.book.isbn) || false

  async function clickHandler(isbn, isFavorite) {
    try {
      if (isFavorite) {
        await removeFavoriteBook(isbn)
      } else {
        await addFavoriteBook(isbn)
      }
      await refetch()
    } catch (e) {
      toast.error('エラーが発生しました')
    }
  }
  return (
    <Button
      variant="ghost"
      className="absolute bottom-2 right-3 p-0"
      onClick={() => clickHandler(props.book.isbn, isFavorite)}
    >
      <div className={`${!isFavorite ? 'bg-border' : 'bg-primary'} w-fit rounded-full  p-2 text-white`}>
        <Heart size="18" />
      </div>
    </Button>
  )
}

export default FavoriteToggleButton
