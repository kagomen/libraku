import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { search } from '../lib/api'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import { useSearchResultCache } from '../context/SearchResultCache'
import Loading from '../components/Loading'

const SearchResultsPage = () => {
  const { keyword } = useParams()
  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [num, setNum] = useState(2)
  const [totalCount, setTotalCount] = useState(null)
  const { searchResultCache, setSearchResultCache } = useSearchResultCache()
  const observerRef = useRef()

  const searchBooks = useCallback(async () => {
    if (searchResultCache[keyword]) {
      setBooks(searchResultCache[keyword])
    } else {
      setIsLoading(true)
      const res = await search(keyword, 1)
      setBooks(res.data.Items)
      setTotalCount(res.data.count)
      setSearchResultCache((prevCache) => ({
        ...prevCache,
        [keyword]: res.data.Items,
      }))
      setIsLoading(false)
    }
  }, [keyword, searchResultCache, setSearchResultCache])

  useEffect(() => {
    searchBooks()
  }, [keyword, searchBooks])

  const searchMoreBooks = useCallback(async () => {
    const res = await search(keyword, num)
    setBooks((prevBooks) => [...prevBooks, ...res.data.Items])
    setNum((prevNum) => prevNum + 1)
    console.log('num', num)
  }, [keyword, num])

  useEffect(() => {
    if (searchResultCache[keyword]) {
      const booksObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          searchMoreBooks()
        }
      })
      booksObserver.observe(observerRef.current)
      return () => {
        booksObserver.disconnect()
      }
    }
  }, [keyword, searchMoreBooks, searchResultCache])

  return (
    <div className="mx-auto mb-8 w-[90%]">
      <SearchBar />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <BookList books={books} keyword={keyword} totalCount={totalCount} />
        </div>
      )}
      {/* 無限スクロール用のLoading設定 */}
      {!isLoading && (
        <div ref={observerRef} className="h-20 text-black">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
