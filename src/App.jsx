import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Search from './components/Search'
import BookList from './components/BookList'
import { init } from './lib/api'
import SelectedBookPage from './components/SelectedBookPage'

function App() {
  const [keyword, setKeyword] = useState()
  const [searchedBooks, setSearchedBooks] = useState()
  const [selectedBookData, setSelectedBookData] = useState()

  function handleInputChange(e) {
    setKeyword(e.target.value)
  }

  async function searchBook(e) {
    e.preventDefault()
    const res = await init(keyword)
    setSearchedBooks(res.data.items)
  }

  function selectBook(book) {
    // 個別ページを表示する
    console.log(book);
    setSelectedBookData(book)
  }

  return (
    <>
      <Header />
      <Hero />
      <Search handleInputChange={handleInputChange} searchBook={searchBook} />
      {searchedBooks && (
        <BookList searchedBooks={searchedBooks} selectBook={selectBook} />
      )}

      {selectedBookData && (
        <SelectedBookPage data={selectedBookData} />
      )}
      <Footer />
    </>
  )
}

export default App
