import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import TopPage from './top/TopPage'
import SearchResultsPage from './search/SearchResultsPage'
import BookDataPage from './book/BookDataPage'
import ContactPage from './contact/ContactPage'
import ContactSuccessPage from './contact/ContactSuccessPage'
import AboutPage from './about/AboutPage'
import SignUpPage from './sign-up/SignUpPage'
import SignInPage from './sign-in/SignInPage'
import VerifyVerificationCodePage from './verify-code/VerifyVerificationCodePage'
import SettingsPage from './settings/SettingsPage'
import SettingCardNumberPage from './settings/user-number/SettingCardNumberPage'
import ChangeEmailPage from './settings/email/ChangeEmailPage'
import VerifyCodeForChangeEmailPage from './settings/email/verify-code/VerifyCodeForChangeEmailPage'
import ChangePasswordPage from './settings/password/ChangePasswordPage'
import FavoritesPage from './favorites/FavoritesPage'
import NotFoundPage from './not-found/NotFoundPage'
import AboutPwaPage from './about-pwa/AboutPwaPage'

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
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'verify-code',
        element: <VerifyVerificationCodePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'settings/user-number',
        element: <SettingCardNumberPage />,
      },
      {
        path: 'settings/email',
        element: <ChangeEmailPage />,
      },
      {
        path: 'settings/email/verify-code',
        element: <VerifyCodeForChangeEmailPage />,
      },
      {
        path: 'settings/password',
        element: <ChangePasswordPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'about-pwa',
        element: <AboutPwaPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
