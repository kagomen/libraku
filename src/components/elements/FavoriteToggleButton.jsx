import { addFavoriteBook, removeFavoriteBook } from '@/api'
import { Button } from '@/components/shadcn-ui/button'
import { toast } from 'sonner'
import { Heart } from 'lucide-react'
import { useFavoriteIsbnList } from '@/hooks'
import { cn } from '@/utils/tailwindHelpers'

function FavoriteToggleButton(props) {
  const { data: favoriteIsbnList, refetch } = useFavoriteIsbnList()
  const isFavorite = favoriteIsbnList?.includes(props.isbn)

  async function clickHandler(isbn) {
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
      className={cn('absolute bottom-2 right-3 p-0', props.className)}
      onClick={() => clickHandler(props.isbn)}
    >
      <div
        className={`${isFavorite ? 'bg-primary' : 'bg-border'} flex h-8 w-8 items-center justify-center rounded-full text-white`}
      >
        <Heart size="18" />
      </div>
    </Button>
  )
}

export default FavoriteToggleButton
