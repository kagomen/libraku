import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogContent, DialogTitle } from '@/components/shadcn-ui/dialog'
import src from '@/assets/rabbit-emoji/emoji_u1f407.svg'
import { Button } from '@/components/shadcn-ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { useFavoriteBooks, useFavoriteIsbnList } from '@/hooks'
import { deleteAllFavoriteBooks } from '@/api'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

function AllDeleteButton() {
  const { data: favoriteIsbnList, refetch: favoriteIsbnListRefetch } = useFavoriteIsbnList()
  const { refetch: favoriteBooksRefetch } = useFavoriteBooks()
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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setIsOpen(true)} disabled={favoriteIsbnList.length == 0}>
          <Trash2 size="16" className="mr-2" />
          全件削除
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <VisuallyHidden asChild>
          <DialogTitle>お気に入りの削除</DialogTitle>
        </VisuallyHidden>
        <img src={src} alt="" width="72" height="72" className="mx-auto" />
        <p className="text-center">すべて削除しますか？</p>
        <Button onClick={deleteAllFavoriteBooksHandler}>削除する</Button>
      </DialogContent>
    </Dialog>
  )
}

export default AllDeleteButton
