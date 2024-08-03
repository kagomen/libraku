import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import TopPage from '../routes/TopPage.jsx'
import NotFoundPage from '../routes/NotFoundPage.jsx'
import SearchResultsPage from '../routes/SearchResultsPage.jsx'
import BookDataPage from '../routes/BookDataPage.jsx'
import ContactPage from '../routes/ContactPage.jsx'
import ContactSuccessPage from '../routes/ContactSuccessPage.jsx'
import AboutPage from '@/routes/AboutPage.jsx'
import UserPage from '@/routes/UserPage.jsx'
import SignUpPage from '@/routes/SignUpPage.jsx'
import SignInPage from '@/routes/SignInPage.jsx'
import SettingsPage from '@/routes/SettingsPage.jsx'
import SettingCardNumberPage from '@/routes/settings/SettingCardNumberPage.jsx'

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
        path: 'user-page',
        element: <UserPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'settings/user-number',
        element: <SettingCardNumberPage />,
      },
    ],
  },
])
