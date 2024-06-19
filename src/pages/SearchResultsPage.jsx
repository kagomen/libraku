import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import Loading from '../components/Loading'


const SearchResultsPage = () => {
  const { keyword } = useParams()

  return (
    <div className="mx-auto mb-8 w-[90%]">
      <SearchBar keyword={keyword} />
      <Suspense fallback={<Loading />}>
        <BookList keyword={keyword} />
      </Suspense>
    </div>
  )
}

export default SearchResultsPage
