import Header from './components/Header'
import TopPage from './pages/TopPage'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import SearchResultsPage from './pages/SearchResultsPage'
import BookDataPage from './pages/BookDataPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <div className="relative min-h-screen bg-emerald-25 pb-[32px] text-zinc-700">
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/search/:keyword" element={<SearchResultsPage />} />
        <Route path="/book/:isbn" element={<BookDataPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
