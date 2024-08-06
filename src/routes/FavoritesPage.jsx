import { useUserId } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import FavoritesList from '@/components/favorites/FavoritesList'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import Heading from '@/components/Heading'

function FavoritesPage() {
  const { data: userId } = useUserId()
  console.log(userId)
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
        <FavoritesList />
      </ResponsiveWrapper>
    </div>
  )
}

export default FavoritesPage
