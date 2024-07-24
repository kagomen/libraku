import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import TopPage from '../routes/TopPage.jsx'
import NotFoundPage from '../routes/NotFoundPage.jsx'
import SearchResultsPage from '../routes/SearchResultsPage.jsx'
import BookDataPage from '../routes/BookDataPage.jsx'
import ContactPage from '../routes/ContactPage.jsx'
import ContactSuccessPage from '../routes/ContactSuccessPage.jsx'
import AboutPage from '@/routes/AboutPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <TopPage />,
      },
      {
        path: 'search/:keyword',
        element: <SearchResultsPage />,
      },
      {
        path: 'book/:isbn',
        element: <BookDataPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'contact/success',
        element: <ContactSuccessPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
