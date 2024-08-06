import FavoritesList from '@/components/favorites/FavoritesList'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import Heading from '@/components/Heading'
import { useNavigate } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import FavoritesListSkelton from '@/components/favorites/FavoritesListSkelton'
import { useUserContext } from '@/context/UserContext'

function FavoritesPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()
  useEffect(() => {
    if (!userId) {
      nav('/')
    }
  }, [nav, userId])
  return (
    <div className="bg-background py-12">
      <ResponsiveWrapper>
        <Heading>お気に入り一覧</Heading>
        <Suspense fallback={<FavoritesListSkelton />}>
          <FavoritesList />
        </Suspense>
      </ResponsiveWrapper>
    </div>
  )
}

export default FavoritesPage
