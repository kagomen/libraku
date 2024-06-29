import Header from './components/Header'
import TopPage from './pages/TopPage'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import SearchResultsPage from './pages/SearchResultsPage'
import BookDataPage from './pages/BookDataPage'
import NotFoundPage from './pages/NotFoundPage'
import ContactPage from './pages/ContactPage'
import ContactSuccessPage from './pages/ContactSuccessPage'

export default function App() {
  return (
    <div className="bg-emerald-25 min-h-dvh text-zinc-700">
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/search/:keyword" element={<SearchResultsPage />} />
        <Route path="/book/:isbn" element={<BookDataPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact/success" element={<ContactSuccessPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
