import { useParams } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import BookData from "../components/BookData"
import { useEffect, useState } from "react"
import { get } from "../lib/api"
import BackBtn from "../components/BackBtn"

const BookDataPage = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  async function getBookData() {
    const res = await get(id)
    setBook(res.data)
  }

  useEffect(() => {
    getBookData()
  }, [id])

  return (
    <div className="mx-auto w-[90%] mb-8">
      <SearchBar />
      {book ? <BookData book={book} /> : <p>Loading...</p>}
      <BackBtn />
    </div>
  )
}

export default BookDataPage