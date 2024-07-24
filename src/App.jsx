import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function App() {
  return (
    <div className="bg-emerald-25 min-h-dvh">
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
