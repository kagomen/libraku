import Header from './components/Header'
import TopPage from './pages/TopPage'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import SearchResultsPage from './pages/SearchResultsPage'
import BookDataPage from './pages/BookDataPage'

function App() {

  return (
    <div className='bg-emerald-25 text-zinc-700 min-h-screen relative pb-[64px]'>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/search/:keyword" element={<SearchResultsPage />} />
        <Route path="/book/:id" element={<BookDataPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
