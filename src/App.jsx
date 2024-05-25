import { useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Search from './components/Search'
import BookList from './components/BookList'
import { init } from './lib/api'
import SelectedBookPage from './components/SelectedBookPage'

function App() {
  const [searchedBooks, setSearchedBooks] = useState(null)
  const [selectedBook, setselectedBook] = useState(null)
  const keywordRef = useRef()

  function initBookData() {
    setSearchedBooks(null)
    setselectedBook(null)
  }

  async function onSearch(e) {
    e.preventDefault()
    setselectedBook(null)
    const res = await init(keywordRef.current.value)
    setSearchedBooks(res.data.items)
  }

  function onSelect(book) {
    setselectedBook(book)
  }

  function goHome() {
    keywordRef.current.value = null
    initBookData()
  }

  return (
    <div>
      <Header goHome={goHome} />
      {searchedBooks == null && <Hero />}
      <Search keywordRef={keywordRef} onSearch={onSearch} />
      {selectedBook ? (
        <SelectedBookPage data={selectedBook} />
      ) : (
        searchedBooks && <BookList searchedBooks={searchedBooks} onSelect={onSelect} />
      )}
      {searchedBooks != null && <Footer />}
    </div>
  )
}

export default App
