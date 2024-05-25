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
  const [isLoading, setIsLoading] = useState(false)
  const keywordRef = useRef()

  function initBookData() {
    setSearchedBooks(null)
    setselectedBook(null)
  }

  async function onSearch(e) {
    e.preventDefault()
    setIsLoading(true)
    setselectedBook(null)
    const res = await init(keywordRef.current.value)
    setSearchedBooks(res.data.items)
    setIsLoading(false)
  }

  function onSelect(book) {
    setselectedBook(book)
  }

  function goHome() {
    keywordRef.current.value = null
    initBookData()
  }

  return (
    <div className='bg-emerald-25 text-zinc-700 min-h-screen relative pb-[64px]'>
      <Header goHome={goHome} />
      {searchedBooks == null && !isLoading && <Hero />}
      <Search keywordRef={keywordRef} onSearch={onSearch} />
      {selectedBook ? (
        <SelectedBookPage data={selectedBook} />
      ) : (
        <BookList searchedBooks={searchedBooks} onSelect={onSelect} isLoading={isLoading} />
      )}
      {/* {searchedBooks != null && !isLoading && <Footer />} */}
      <Footer />
    </div>
  )
}

export default App
