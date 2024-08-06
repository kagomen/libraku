import { useFavorites } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import NoImage from '@/assets/noimage.webp'
import MessageShowAllItems from '../MessageShowAllItems'

function FavoritesList() {
  const { data: favorites } = useFavorites()

  return (
    <div className="py-12">
      <p className="text-sm font-semibold">全 {favorites.length} 件</p>
      {favorites?.map((favorite) => {
        return (
          <Link to={`/book/${favorite.isbn}`} key={favorite.isbn}>
            <Card className="mt-4 flex gap-4 p-4">
              <img src={favorite.imageUrl ?? NoImage} width="93.5" height="121" className="shrink-0" loading="lazy" />
              <div>
                <h2 className="mb-1 text-base font-semibold">{favorite.title}</h2>
                <p className="text-sm">{favorite.author}</p>
              </div>
            </Card>
          </Link>
        )
      })}
      <MessageShowAllItems />
    </div>
  )
}

export default FavoritesList
