import Heading from '@/components/elements/Heading'
import { Suspense } from 'react'
import FavoritesListSkelton from './components/FavoritesListSkelton'
import FavoritesList from './components/FavoritesList'
import { useUserContext } from '@/contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/elements/Loading'

function FavoritesPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()

  if (userId === null) {
    nav('/')
  }

  if (userId === undefined) {
    return <Loading />
  }

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
