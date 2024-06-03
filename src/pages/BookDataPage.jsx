import { useParams } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import BookData from "../components/BookData"
import { useCallback, useEffect, useState } from "react"
import { get } from "../lib/api"
import { useBookDataCache } from "../context/BookDataCache"
import Loading from "../components/Loading"

const BookDataPage = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { bookDataCache, setBookDataCache } = useBookDataCache()

  const getBookData = useCallback(async () => {
    if (bookDataCache[id]) {
      setBook(bookDataCache[id])
    } else {
      setIsLoading(true)
      const res = await get(id)
      setBook(res.data)
      setBookDataCache(prevCache => (
        {
          ...prevCache,
          [id]: res.data
        }
      ))
      setIsLoading(false)
    }
  }, [id, bookDataCache, setBookDataCache])

  useEffect(() => {
    getBookData()
  }, [id, getBookData])

  return (
    <div className="mx-auto w-[90%] mb-8">
      <SearchBar />
      {isLoading ? <Loading /> : <BookData book={book} />}
    </div>
  )
}

export default BookDataPage