import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'
import Footer from './components/Footer'
import BookList from './components/BookList'
import { init } from './lib/api'
import Search from './components/Search'
import { useState } from 'react'

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
