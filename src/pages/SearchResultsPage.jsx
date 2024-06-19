import { Suspense, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import Loading from '../components/Loading'
import { useSearchData } from '../context/SearchData'

const SearchResultsPage = () => {
  const { keyword } = useParams()
  const { setKeyword } = useSearchData()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith('/search/')) {
      setKeyword(keyword)
    }
  }, [location.pathname, setKeyword, keyword])

  return (
    <div className="mx-auto mb-8 w-[90%]">
      <SearchBar />
      <Suspense fallback={<Loading />}>
        <BookList keyword={keyword} />
      </Suspense>
    </div>
  )
}

export default SearchResultsPage
