import { useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BookData from '../components/BookData'
import { Suspense } from 'react'
import Loading from '../components/Loading'

const BookDataPage = () => {
  const { isbn } = useParams()

  return (
    <div className="mx-auto mb-8 w-[90%]">
      <SearchBar />
      <Suspense fallback={<Loading />}>
        <BookData isbn={isbn} />
      </Suspense>
    </div>
  )
}

export default BookDataPage
