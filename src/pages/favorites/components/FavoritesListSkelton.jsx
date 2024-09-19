import { Card } from '@/components/shadcn-ui/card'
import { Skeleton } from '@/components/shadcn-ui/skeleton'
import { Trash2 } from 'lucide-react'

function FavoritesListSkelton() {
  function FavoriteSkelton() {
    return (
      <Card className="relative mt-4 p-4">
        <div className="flex gap-4">
          <Skeleton className="h-[121px] w-[93.5px] shrink-0 self-start" />
          <div className="w-full">
            <Skeleton className="mb-1 h-6 w-full" />
            <Skeleton className="h-5 w-[80%]" />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="pt-12">
      <div className="flex items-center justify-between">
        <p className="ml-1.5 text-sm font-semibold">全 ? 件</p>
        <Skeleton className="flex h-9 w-fit items-center justify-between rounded-md bg-primary px-2 text-xs text-white">
          <Trash2 size="16" className="mr-2" />
          全件削除
        </Skeleton>
      </div>
      <FavoriteSkelton />
      <FavoriteSkelton />
      <FavoriteSkelton />
      <FavoriteSkelton />
      <FavoriteSkelton />
      <FavoriteSkelton />
      <FavoriteSkelton />
    </div>
  )
}

export default FavoritesListSkelton
