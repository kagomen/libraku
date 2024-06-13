import { useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BookData from '../components/BookData'
import { useCallback, useEffect, useState } from 'react'
import { get } from '../lib/api'
import { useBookDataCache } from '../context/BookDataCache'
import Loading from '../components/Loading'

const BookDataPage = () => {
  const { isbn } = useParams()
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { bookDataCache, setBookDataCache } = useBookDataCache()

  const getBookData = useCallback(async () => {
    if (bookDataCache[isbn]) {
      setBook(bookDataCache[isbn])
    } else {
      setIsLoading(true)
      const res = await get(isbn)
      setBook(res.data.Items[0])
      setBookDataCache((prevCache) => ({
        ...prevCache,
        [isbn]: res.data.Items[0],
      }))
      setIsLoading(false)
    }
  }, [isbn, bookDataCache, setBookDataCache])

  useEffect(() => {
    getBookData()
  }, [isbn, getBookData])

  return (
    <div className="mx-auto mb-8 w-[90%]">
      <SearchBar />
      {isLoading ? <Loading /> : <BookData book={book} />}
    </div>
  )
}

export default BookDataPage
