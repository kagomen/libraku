import { addFavoriteBook, removeFavoriteBook, useFavoriteIsbnList } from '@/lib/api'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

function FavoriteToggleButton(props) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { data: favoriteIsbnList } = useFavoriteIsbnList()

  useEffect(() => {
    if (favoriteIsbnList && props.book) {
      setIsFavorite(favoriteIsbnList.includes(props.book.isbn))
    }
  }, [favoriteIsbnList, props.book])

  async function clickHandler() {
    try {
      if (isFavorite) {
        await removeFavoriteBook(props.isbn)
        // toast.success('お気に入りから削除しました')
      } else {
        await addFavoriteBook(props.isbn)
        // toast.success('お気に入りに追加しました')
      }
      setIsFavorite(!isFavorite)
    } catch (e) {
      toast.error('エラーが発生しました')
    }
  }
  return (
    <Button variant="ghost" className="absolute right-5 top-5 p-0" onClick={() => clickHandler(props.book.isbn)}>
      <div className={`${!isFavorite ? 'bg-border' : 'bg-primary'} w-fit rounded-full p-2.5 text-white`}>
        <Heart />
      </div>
    </Button>
  )
}

export default FavoriteToggleButton
