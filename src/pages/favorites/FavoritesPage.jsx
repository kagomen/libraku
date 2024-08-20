import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import Heading from '@/components/elements/Heading'
import { useNavigate } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useUserInfo } from '@/api/api'
import FavoritesListSkelton from './components/FavoritesListSkelton'
import FavoritesList from './components/FavoritesList'

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
