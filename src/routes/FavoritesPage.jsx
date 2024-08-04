import { useFavorites, useUserId } from '@/lib/api'

function FavoritesPage() {
  const { data: userId } = useUserId()
  const { data, isLoading } = useFavorites()
  console.log('data:', data)
  if (isLoading) return <div>Loading</div>
  return (
    <div>
      <div>{userId}</div>
      <ul>
        {/* {data.map((data) => (
          <li key={data.isbn}>{data.isbn}</li>
        ))} */}
      </ul>
    </div>
  )
}

export default FavoritesPage
