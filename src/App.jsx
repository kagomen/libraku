import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Search from './components/Search'
import BookList from './components/BookList'
import { init } from './lib/api'

function App() {
  const [keyword, setKeyword] = useState()
  const [searchedBooks, setSearchedBooks] = useState()

  function handleInputChange(e) {
    setKeyword(e.target.value)
  }

  async function searchBook(e) {
    e.preventDefault()
    const res = await init(keyword)
    setSearchedBooks(res.data.items)
  }

  return (
    <>
      <Header />
      <Hero />
      <Search handleInputChange={handleInputChange} searchBook={searchBook} />
      {searchedBooks && (
        <BookList searchedBooks={searchedBooks} />
      )}
      <Footer />
    </>
  )
}

export default App
