import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { moreSearch, search } from "../lib/api";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { useSearchResultCache } from "../context/SearchResultCache";
import Loading from "../components/Loading";

const SearchResultsPage = () => {
  const { keyword } = useParams()
  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [num, setNum] = useState(1)
  const { searchResultCache, setSearchResultCache } = useSearchResultCache()

  const searchBooks = useCallback(async () => {
    if (searchResultCache[keyword]) {
      setBooks(searchResultCache[keyword])
    } else {
      setIsLoading(true)
      const res = await search(keyword)
      setBooks(res.data.items)
      setSearchResultCache(prevCache => (
        {
          ...prevCache,
          [keyword]: res.data.items
        }
      ))
      setIsLoading(false)
    }
  }, [keyword, searchResultCache, setSearchResultCache])

  useEffect(() => {
    searchBooks()
  }, [keyword, searchBooks])

  const searchMoreBooks = useCallback(async () => {
    const res = await moreSearch(keyword, 10 * num)
    setBooks(prevBooks => [...prevBooks, ...res.data.items])
    setNum(prevNum => prevNum + 1)
    console.log('num', num)
  }, [keyword, num])

  const observerRef = useRef()

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
    <div className="mx-auto w-[90%] mb-8">
      <SearchBar />
      <p>&quot;{keyword}&quot;の検索結果</p>
      {isLoading ?
        <Loading /> : (
          <div>
            <BookList books={books} />

          </div>
        )
      }
      <div ref={observerRef} className="h-20 text-black">Intersection Observer</div>
    </div>
  )
}

export default SearchResultsPage