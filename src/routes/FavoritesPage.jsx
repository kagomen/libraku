import FavoritesList from '@/components/favorites/FavoritesList'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import Heading from '@/components/Heading'
import { useNavigate } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import FavoritesListSkelton from '@/components/favorites/FavoritesListSkelton'
import { useUserContext } from '@/contexts/UserContext'
import { useUserInfo } from '@/api/api'

function FavoritesPage() {
  const { data, isLoading } = useUserInfo()
  const { setUserId } = useUserContext()
  const nav = useNavigate()

  useEffect(() => {
    if (!isLoading && data) {
      setUserId(data.userId)
    } else {
      setUserId(null)
      nav('/')
    }
  }, [data, isLoading, setUserId, nav])

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
