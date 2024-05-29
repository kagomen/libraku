import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { search } from "../lib/api";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";

const SearchResultsPage = () => {
  const { keyword } = useParams()
  const [books, setBooks] = useState(null)
  const [cache, setCache] = useState({})

  async function searchBooks() {
    if (cache[keyword]) {
      setBooks(cache[keyword])
    } else {
      const res = await search(keyword)
      setBooks(res.data.items)
      setCache(prevCache => (
        {
          ...prevCache,
          [keyword]: res.data.items
        }
      ))
    }
  }

  useEffect(() => {
    searchBooks()
  }, [keyword])

  return (
    <div className="mx-auto w-[90%] mb-8">
      <SearchBar />
      <p>&quot;{keyword}&quot;の検索結果</p>
      {books ? <BookList books={books} /> : <p>Loading...</p>}
    </div>
  )
}

export default SearchResultsPage