import { useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Search from './components/Search'
import BookList from './components/BookList'
import { init } from './lib/api'
import SelectedBookPage from './components/SelectedBookPage'

function App() {
  const [searchedBooks, setSearchedBooks] = useState()
  const [selectedBookData, setSelectedBookData] = useState()
  const keywordRef = useRef()

  async function searchBook(e) {
    e.preventDefault()
    setSelectedBookData()
    const res = await init(keywordRef.current.value)
    setSearchedBooks(res.data.items)
  }

  function selectBook(book) {
    setSelectedBookData(book)
  }

  function goHome() {
    keywordRef.current.value = null
    setSearchedBooks()
    setSelectedBookData()
  }

  return (
    <>
      <Header goHome={goHome} />
      {searchedBooks ? null : <Hero />}
      <Search keywordRef={keywordRef} searchBook={searchBook} />
      {}

      {selectedBookData ? (
        <SelectedBookPage data={selectedBookData} />
      ) : (
        searchedBooks && <BookList searchedBooks={searchedBooks} selectBook={selectBook} />
      )}
      <Footer />
    </>
  )
}

export default App
