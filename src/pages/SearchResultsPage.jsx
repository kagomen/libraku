import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { search } from "../lib/api";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { useSearchResultCache } from "../context/SearchResultCache";
import Loading from "../components/Loading";

const SearchResultsPage = () => {
  const { keyword } = useParams()
  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
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

  return (
    <div className="mx-auto w-[90%] mb-8">
      <SearchBar />
      <p>&quot;{keyword}&quot;の検索結果</p>
      {isLoading ? <Loading /> : <BookList books={books} />}
    </div>
  )
}

export default SearchResultsPage