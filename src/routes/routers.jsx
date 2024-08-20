import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import TopPage from '@/routes/TopPage'
import NotFoundPage from '@/routes/NotFoundPage'
import SearchResultsPage from '@/routes/book/SearchResultsPage'
import BookDataPage from '@/routes/book/BookDataPage'
import ContactPage from '@/routes/contact/ContactPage'
import ContactSuccessPage from '@/routes/contact/ContactSuccessPage'
import AboutPage from '@/routes/AboutPage'
import UserPage from '@/routes/UserPage'
import SignUpPage from '@/routes/auth/SignUpPage'
import SignInPage from '@/routes/auth/SignInPage'
import SettingsPage from '@/routes/user/SettingsPage'
import SettingCardNumberPage from '@/routes/user/SettingCardNumberPage'
import FavoritesPage from '@/routes/user/FavoritesPage'
import ChangePasswordPage from '@/routes/user/ChangePasswordPage'
import ChangeEmailPage from '@/routes/user/ChangeEmailPage'
import VerifyVerificationCodePage from '@/routes/auth/VerifyVerificationCodePage'
import VerifyCodeForChangeEmailPage from '@/routes/user/VerifyCodeForChangeEmailPage'

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
        path: 'settings/email/verify',
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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
