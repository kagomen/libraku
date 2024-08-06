import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

function FavoritesListSkelton() {
  function FavoriteSkelton() {
    return (
      <Card className="mt-4 flex gap-4 p-4">
        <Skeleton className="h-[121px] w-[93.5px] shrink-0" />
        <div className="w-full">
          <Skeleton className="mb-1 h-6 w-full" />
          <Skeleton className="h-5 w-[80%]" />
        </div>
      </Card>
    )
  }

  return (
    <div className="py-12">
      <p className="text-sm font-semibold">全 ? 件</p>
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
