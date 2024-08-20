import Heading from '@/components/elements/Heading'
import { useNavigate } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useUserInfo } from '@/hooks'
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
    <div className="container py-12">
      <Heading>お気に入り一覧</Heading>
      <Suspense fallback={<FavoritesListSkelton />}>
        <FavoritesList />
      </Suspense>
    </div>
  )
}

export default FavoritesPage
