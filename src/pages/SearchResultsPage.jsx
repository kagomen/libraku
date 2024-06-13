import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { search } from '../lib/api'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import { useSearchResultCache } from '../context/SearchResultCache'
import Loading from '../components/Loading'
import { useSearchData } from '../context/SearchData'

const SearchResultsPage = () => {
  const { keyword } = useParams()
  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(2)
  const [pageCount, setPageCount] = useState(null)
  const { searchResultCache, setSearchResultCache } = useSearchResultCache()
  const { count, setCount } = useSearchData()
  const observerRef = useRef()

  const searchBooks = useCallback(async () => {
    if (searchResultCache[keyword]) {
      setBooks(searchResultCache[keyword])
    } else {
      setIsLoading(true)
      const res = await search(keyword, 1)
      setBooks(res.data.Items)
      setCount(res.data.count)
      setPageCount(res.data.pageCount)
      setSearchResultCache((prevCache) => ({
        ...prevCache,
        [keyword]: res.data.Items,
      }))
      setIsLoading(false)
    }
  }, [keyword, searchResultCache, setSearchResultCache, setCount])

  useEffect(() => {
    searchBooks()
  }, [keyword, searchBooks])

  const searchMoreBooks = useCallback(async () => {
    const res = await search(keyword, page)
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, ...res.data.Items];
      setSearchResultCache((prevCache) => ({
        ...prevCache,
        [keyword]: updatedBooks,
      }))
      return updatedBooks
    })
    setPage((prevPage) => prevPage + 1)
  }, [keyword, page, setSearchResultCache])

  useEffect(() => {
    if (searchResultCache[keyword] && observerRef.current) {
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
          <BookList books={books} keyword={keyword} count={count} />
        </div>
      )}
      {/* 無限スクロール用のLoading設定 */}
      {page - 1 < pageCount && !isLoading && (
        <div ref={observerRef} className="h-20 text-black">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
